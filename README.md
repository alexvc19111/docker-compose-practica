# 🐳 Docker Compose Lab — Integración de Sistemas

Práctica de orquestación de contenedores con **React + Express + PostgreSQL**.

## Estructura del proyecto

```
docker-compose-lab/
├── docker-compose.yml       ← Orquestador principal
├── frontend/                ← React + Vite (puerto 3000)
│   ├── Dockerfile
│   ├── src/App.jsx
│   └── ...
├── backend/                 ← Express API (puerto 4000)
│   ├── Dockerfile
│   ├── src/index.js
│   └── ...
└── postgres/
    └── init.sql             ← Script inicial de BD
```

## Levantar el proyecto

```bash
# 1. Construir imágenes y levantar servicios
docker compose up --build

# 2. En segundo plano
docker compose up --build -d

# 3. Ver logs de todos los servicios
docker compose logs -f

# 4. Detener
docker compose down
```

## URLs

| Servicio   | URL                          |
|------------|------------------------------|
| Frontend   | http://localhost:3000        |
| Backend    | http://localhost:4000        |
| PostgreSQL | localhost:5432               |

## Comandos útiles para la práctica

```bash
# Ver contenedores activos
docker compose ps

# Métricas en tiempo real
docker stats

# Entrar al contenedor de backend
docker exec -it lab_backend sh

# Conectarse a PostgreSQL
docker exec -it lab_postgres psql -U admin -d dockerlab
```
