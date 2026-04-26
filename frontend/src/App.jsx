import React, { useState, useEffect, useCallback } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

/* ─── Iconos SVG inline ──────────────────────────────────────── */
const Icon = ({ name, size = 18 }) => {
  const icons = {
    docker: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.974 0h2.118a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.1a.186.186 0 00-.186.186v1.887c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/>
      </svg>
    ),
    cpu: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>
      </svg>
    ),
    memory: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M3 9h18M3 5h18M3 9v10a1 1 0 001 1h16a1 1 0 001-1V9"/>
      </svg>
    ),
    database: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    plus: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    trash: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
        <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
      </svg>
    ),
    refresh: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
    ),
    log: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

/* ─── Gauge circular ─────────────────────────────────────────── */
function CircleGauge({ value, max = 100, label, color, unit = "%" }) {
  const pct = Math.min((value / max) * 100, 100);
  const r = 36, cx = 44, cy = 44;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8"/>
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="monospace">
          {Math.round(value)}{unit}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">
          {label}
        </text>
      </svg>
    </div>
  );
}

/* ─── Barra de progreso ──────────────────────────────────────── */
function ProgressBar({ value, max, color, label }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4, fontFamily: "monospace" }}>
        <span>{label}</span><span>{value} / {max} MB</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 4, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.5s ease" }}/>
      </div>
    </div>
  );
}

/* ─── Pulsing dot ────────────────────────────────────────────── */
function Dot({ color = "#22c55e" }) {
  return (
    <span style={{ position: "relative", display: "inline-block", width: 10, height: 10 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, animation: "ping 1.5s ease-in-out infinite", opacity: 0.6 }}/>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color }}/>
    </span>
  );
}

/* ─── Tarjeta genérica ───────────────────────────────────────── */
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: 12,
      padding: "18px 20px",
      backdropFilter: "blur(8px)",
      ...style
    }}>
      {children}
    </div>
  );
}

/* ─── App principal ──────────────────────────────────────────── */
export default function App() {
  const [metrics, setMetrics]   = useState(null);
  const [dbStatus, setDbStatus] = useState(null);
  const [tasks, setTasks]       = useState([]);
  const [logs, setLogs]         = useState([]);
  const [newTask, setNewTask]   = useState("");
  const [tab, setTab]           = useState("metrics");
  const [loading, setLoading]   = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [history, setHistory]   = useState([]); // historial CPU/MEM para mini-sparkline

  const fetchAll = useCallback(async () => {
    try {
      const [m, db, t, l] = await Promise.all([
        fetch(`${API}/api/metrics`).then(r => r.json()),
        fetch(`${API}/api/db-status`).then(r => r.json()),
        fetch(`${API}/api/tasks`).then(r => r.json()),
        fetch(`${API}/api/logs`).then(r => r.json()),
      ]);
      setMetrics(m);
      setDbStatus(db);
      setTasks(t);
      setLogs(l);
      setLastUpdate(new Date());
      setHistory(prev => {
        const entry = { cpu: parseFloat(m.host?.cpuLoad || 0), mem: parseFloat(m.host?.usedMemPct || 0), t: Date.now() };
        return [...prev.slice(-19), entry];
      });
    } catch (e) {
      console.error("Error fetching:", e);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, 3000);
    return () => clearInterval(id);
  }, [fetchAll]);

  const addTask = async () => {
    if (!newTask.trim()) return;
    setLoading(true);
    await fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    setNewTask("");
    await fetchAll();
    setLoading(false);
  };

  const toggleTask = async (task) => {
    const next = task.status === "done" ? "pending" : "done";
    await fetch(`${API}/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    await fetchAll();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}`, { method: "DELETE" });
    await fetchAll();
  };

  // Mini sparkline SVG
  const Sparkline = ({ data, key_, color, height = 30, width = 120 }) => {
    if (data.length < 2) return null;
    const vals = data.map(d => d[key_]);
    const max = Math.max(...vals, 1);
    const points = vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * width;
      const y = height - (v / max) * height;
      return `${x},${y}`;
    }).join(" ");
    return (
      <svg width={width} height={height} style={{ display: "block" }}>
        <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    );
  };

  const services = [
    { name: "postgres",  label: "PostgreSQL",  color: "#60a5fa", status: dbStatus?.connected ? "running" : "error", port: 5432 },
    { name: "backend",   label: "Express API", color: "#34d399", status: metrics ? "running" : "error",             port: 4000 },
    { name: "frontend",  label: "React App",   color: "#f472b6", status: "running",                                  port: 3000 },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0e1a 0%, #0d1525 40%, #0a1628 100%)",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      color: "white",
      padding: "0 0 40px 0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        @keyframes ping { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.8);opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .btn { cursor: pointer; border: none; border-radius: 8px; font-family: inherit; font-size: 13px; font-weight: 600; transition: all 0.2s; }
        .btn:hover { filter: brightness(1.15); transform: translateY(-1px); }
        .btn:active { transform: translateY(0); }
        .tab { cursor: pointer; padding: 8px 18px; border-radius: 8px; font-size: 13px; transition: all 0.2s; border: 1px solid transparent; }
        .tab:hover { background: rgba(255,255,255,0.07); }
        .tab.active { background: rgba(99,179,237,0.15); border-color: rgba(99,179,237,0.3); color: #90cdf4; }
        .task-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; transition: background 0.15s; animation: fadeIn 0.3s ease; }
        .task-row:hover { background: rgba(255,255,255,0.05); }
        input[type=text] { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; padding: 10px 14px; color: white; font-family: inherit; font-size: 13px; outline: none; transition: border-color 0.2s; }
        input[type=text]:focus { border-color: rgba(99,179,237,0.5); }
      `}</style>

      {/* ── Header ── */}
      <div style={{
        background: "rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "14px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ color: "#2196F3", display: "flex", filter: "drop-shadow(0 0 8px #2196F3aa)" }}>
            <Icon name="docker" size={28}/>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>Docker Compose Lab</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 2 }}>INTEGRACIÓN DE SISTEMAS · PRÁCTICA</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {lastUpdate && (
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
              Actualizado: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#34d399" }}>
            <Dot color="#34d399"/><span>Live</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>

        {/* ── Servicios activos ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
          {services.map(s => (
            <Card key={s.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: `${s.color}18`,
                border: `1px solid ${s.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: s.color, flexShrink: 0,
              }}>
                <Icon name="docker" size={20}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>:{s.port}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <Dot color={s.status === "running" ? "#22c55e" : "#ef4444"}/>
                <span style={{ fontSize: 9, color: s.status === "running" ? "#22c55e" : "#ef4444", textTransform: "uppercase" }}>
                  {s.status}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {[
            { id: "metrics", icon: "cpu",      label: "Métricas" },
            { id: "tasks",   icon: "check",    label: "Tareas" },
            { id: "logs",    icon: "log",       label: "Logs" },
          ].map(t => (
            <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}
              style={{ display: "flex", alignItems: "center", gap: 6, color: tab === t.id ? "#90cdf4" : "rgba(255,255,255,0.55)" }}>
              <Icon name={t.icon} size={14}/>{t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: MÉTRICAS ── */}
        {tab === "metrics" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, animation: "fadeIn 0.3s ease" }}>

            {/* Backend */}
            <Card>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Icon name="cpu" size={15}/><span style={{ fontSize: 12, fontWeight: 700, color: "#34d399", textTransform: "uppercase", letterSpacing: 1 }}>Backend · Express</span>
              </div>
              {metrics ? (
                <>
                  <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 16 }}>
                    <CircleGauge value={parseFloat(metrics.host.cpuLoad)} max={metrics.host.cpuCores * 2} label="CPU LOAD" color="#34d399"/>
                    <CircleGauge value={parseFloat(metrics.host.usedMemPct)} label="MEM HOST" color="#60a5fa"/>
                    <CircleGauge value={metrics.backend.memHeapUsed} max={metrics.backend.memHeapTotal} label="HEAP" color="#f59e0b" unit=" MB"/>
                  </div>
                  <ProgressBar value={metrics.backend.memRss} max={metrics.host.totalMemMB} color="#34d399" label="RSS Process"/>
                  <ProgressBar value={metrics.backend.memHeapUsed} max={metrics.backend.memHeapTotal} color="#60a5fa" label="Heap Used"/>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                    {[
                      { k: "Uptime",   v: metrics.backend.uptime },
                      { k: "PID",      v: metrics.backend.pid },
                      { k: "Node",     v: metrics.backend.nodeVersion },
                      { k: "Platform", v: metrics.host.platform },
                    ].map(x => (
                      <div key={x.k} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 2, textTransform: "uppercase" }}>{x.k}</div>
                        <div style={{ fontSize: 11, color: "white" }}>{x.v}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: 20, fontSize: 12 }}>Conectando…</div>
              )}
            </Card>

            {/* PostgreSQL */}
            <Card>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Icon name="database" size={15}/><span style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", textTransform: "uppercase", letterSpacing: 1 }}>PostgreSQL · Base de Datos</span>
              </div>
              {dbStatus ? (
                <>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                    <CircleGauge
                      value={dbStatus.connected ? 100 : 0}
                      label={dbStatus.connected ? "ONLINE" : "OFFLINE"}
                      color={dbStatus.connected ? "#22c55e" : "#ef4444"}
                    />
                  </div>
                  {[
                    { k: "Versión",        v: dbStatus.version },
                    { k: "Latencia",       v: `${dbStatus.latencyMs} ms` },
                    { k: "Tamaño DB",      v: `${(dbStatus.sizeBytes / 1024).toFixed(1)} KB` },
                    { k: "Hora servidor",  v: dbStatus.serverTime ? new Date(dbStatus.serverTime).toLocaleTimeString() : "-" },
                  ].map(x => (
                    <div key={x.k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 12 }}>
                      <span style={{ color: "rgba(255,255,255,0.45)" }}>{x.k}</span>
                      <span>{x.v}</span>
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: 20, fontSize: 12 }}>Conectando…</div>
              )}
            </Card>

            {/* Sparkline histórico */}
            <Card style={{ gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>
                Historial en tiempo real (últimas {history.length} muestras · refresco 3s)
              </div>
              <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 10, color: "#34d399", marginBottom: 4 }}>CPU Load</div>
                  <Sparkline data={history} key_="cpu" color="#34d399" width={300} height={40}/>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#60a5fa", marginBottom: 4 }}>Mem Host %</div>
                  <Sparkline data={history} key_="mem" color="#60a5fa" width={300} height={40}/>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ── TAB: TAREAS ── */}
        {tab === "tasks" && (
          <Card style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
              Gestor de Tareas · PostgreSQL
            </div>

            {/* Agregar tarea */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addTask()}
                placeholder="Nueva tarea… (Enter para agregar)"
                style={{ flex: 1 }}
              />
              <button className="btn" onClick={addTask} disabled={loading}
                style={{ background: "#2563eb", color: "white", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="plus" size={15}/> Agregar
              </button>
            </div>

            {/* Lista */}
            <div>
              {tasks.length === 0 && (
                <div style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", padding: "30px 0", fontSize: 12 }}>
                  No hay tareas. Agrega una arriba.
                </div>
              )}
              {tasks.map(t => (
                <div key={t.id} className="task-row">
                  <button className="btn" onClick={() => toggleTask(t)}
                    style={{
                      width: 24, height: 24, padding: 0, borderRadius: 6, flexShrink: 0,
                      background: t.status === "done" ? "#16a34a" : "transparent",
                      border: `2px solid ${t.status === "done" ? "#16a34a" : "rgba(255,255,255,0.2)"}`,
                      color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                    {t.status === "done" && <Icon name="check" size={12}/>}
                  </button>
                  <span style={{
                    flex: 1, fontSize: 13,
                    textDecoration: t.status === "done" ? "line-through" : "none",
                    color: t.status === "done" ? "rgba(255,255,255,0.35)" : "white",
                  }}>{t.title}</span>
                  <span style={{
                    fontSize: 9, padding: "2px 8px", borderRadius: 20, textTransform: "uppercase",
                    background: t.status === "done" ? "rgba(22,163,74,0.2)" : "rgba(245,158,11,0.2)",
                    color: t.status === "done" ? "#4ade80" : "#fbbf24",
                    border: `1px solid ${t.status === "done" ? "rgba(22,163,74,0.3)" : "rgba(245,158,11,0.3)"}`,
                  }}>{t.status}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", minWidth: 70, textAlign: "right" }}>
                    {new Date(t.created_at).toLocaleDateString()}
                  </span>
                  <button className="btn" onClick={() => deleteTask(t.id)}
                    style={{ background: "transparent", color: "rgba(255,100,100,0.6)", padding: "4px 6px", display: "flex", alignItems: "center" }}>
                    <Icon name="trash" size={14}/>
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 16, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
              <span>Total: <b style={{ color: "white" }}>{tasks.length}</b></span>
              <span>Completadas: <b style={{ color: "#4ade80" }}>{tasks.filter(t => t.status === "done").length}</b></span>
              <span>Pendientes: <b style={{ color: "#fbbf24" }}>{tasks.filter(t => t.status === "pending").length}</b></span>
            </div>
          </Card>
        )}

        {/* ── TAB: LOGS ── */}
        {tab === "logs" && (
          <Card style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.5)", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Logs de Actividad · PostgreSQL</span>
              <button className="btn" onClick={fetchAll}
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", padding: "5px 10px", display: "flex", alignItems: "center", gap: 5 }}>
                <Icon name="refresh" size={12}/> Refrescar
              </button>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 11 }}>
              {logs.map(l => (
                <div key={l.id} style={{ display: "flex", gap: 12, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "flex-start" }}>
                  <span style={{ color: "rgba(255,255,255,0.25)", minWidth: 80 }}>
                    {new Date(l.logged_at).toLocaleTimeString()}
                  </span>
                  <span style={{
                    minWidth: 70,
                    color: l.service === "postgres" ? "#60a5fa" : l.service === "backend" ? "#34d399" : "#f472b6",
                    textTransform: "uppercase", fontSize: 9,
                    padding: "1px 6px", borderRadius: 4,
                    background: "rgba(255,255,255,0.05)",
                  }}>{l.service}</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{l.message}</span>
                </div>
              ))}
              {logs.length === 0 && (
                <div style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", padding: "30px 0" }}>Sin logs aún.</div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
