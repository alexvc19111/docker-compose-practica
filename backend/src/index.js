const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Conexión a PostgreSQL ─────────────────────────────────────
const pool = new Pool({
  host:     process.env.DB_HOST     || "localhost",
  port:     parseInt(process.env.DB_PORT) || 5432,
  user:     process.env.DB_USER     || "admin",
  password: process.env.DB_PASSWORD || "secret123",
  database: process.env.DB_NAME     || "dockerlab",
});

// ── Utilidades ────────────────────────────────────────────────
function uptimeFormatted(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

// ── Rutas ─────────────────────────────────────────────────────

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "backend", timestamp: new Date() });
});

// Métricas del contenedor backend
app.get("/api/metrics", async (req, res) => {
  const memUsage = process.memoryUsage();
  const totalMem = os.totalmem();
  const freeMem  = os.freemem();
  const cpus     = os.cpus();

  // Carga CPU promedio (1 min)
  const cpuLoad = os.loadavg()[0];

  res.json({
    backend: {
      uptime:      uptimeFormatted(process.uptime()),
      memRss:      Math.round(memUsage.rss / 1024 / 1024),       // MB
      memHeapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),  // MB
      memHeapTotal:Math.round(memUsage.heapTotal / 1024 / 1024), // MB
      nodeVersion: process.version,
      pid:         process.pid,
    },
    host: {
      cpuCores:    cpus.length,
      cpuModel:    cpus[0]?.model || "unknown",
      cpuLoad:     cpuLoad.toFixed(2),
      totalMemMB:  Math.round(totalMem / 1024 / 1024),
      freeMemMB:   Math.round(freeMem  / 1024 / 1024),
      usedMemPct:  (((totalMem - freeMem) / totalMem) * 100).toFixed(1),
      platform:    os.platform(),
      hostname:    os.hostname(),
    },
    timestamp: new Date(),
  });
});

// ── CRUD Tareas ───────────────────────────────────────────────

// GET todas las tareas
app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear tarea
app.post("/api/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title requerido" });
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
      [title]
    );
    // Log en BD
    await pool.query(
      "INSERT INTO container_logs (service, message) VALUES ($1, $2)",
      ["frontend", `Nueva tarea creada: ${title}`]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH actualizar status
app.patch("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "No encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE tarea
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Logs ──────────────────────────────────────────────────────
app.get("/api/logs", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM container_logs ORDER BY logged_at DESC LIMIT 50"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DB Status ─────────────────────────────────────────────────
app.get("/api/db-status", async (req, res) => {
  try {
    const start = Date.now();
    const result = await pool.query(
      "SELECT version(), pg_database_size(current_database()) AS size_bytes, NOW() AS server_time"
    );
    const latency = Date.now() - start;
    const row = result.rows[0];
    res.json({
      connected:  true,
      latencyMs:  latency,
      version:    row.version.split(" ").slice(0, 2).join(" "),
      sizeBytes:  parseInt(row.size_bytes),
      serverTime: row.server_time,
    });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

// ── Iniciar servidor ──────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend corriendo en http://0.0.0.0:${PORT}`);
});
