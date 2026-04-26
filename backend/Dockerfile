FROM node:20-alpine

WORKDIR /app

# Instalar dependencias primero (capa cacheable)
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

EXPOSE 4000

CMD ["node", "src/index.js"]
