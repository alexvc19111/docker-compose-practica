-- =============================================
--  Docker Compose Lab – Base de datos inicial
-- =============================================

CREATE TABLE IF NOT EXISTS tasks (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(200) NOT NULL,
  status     VARCHAR(50)  NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS container_logs (
  id         SERIAL PRIMARY KEY,
  service    VARCHAR(100) NOT NULL,
  message    TEXT         NOT NULL,
  logged_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Datos de ejemplo
INSERT INTO tasks (title, status) VALUES
  ('Instalar Docker Desktop', 'done'),
  ('Crear el docker-compose.yml', 'done'),
  ('Levantar los servicios con docker compose up', 'pending'),
  ('Verificar las métricas en tiempo real', 'pending'),
  ('Agregar un nuevo servicio al compose', 'pending');

INSERT INTO container_logs (service, message) VALUES
  ('postgres', 'Servicio de base de datos iniciado'),
  ('backend',  'API Express lista en puerto 4000'),
  ('frontend', 'App React lista en puerto 3000');
