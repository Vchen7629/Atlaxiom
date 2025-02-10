# Cache npm dependencies
FROM node:22-alpine AS cache

COPY package*.json ./

RUN npm ci

FROM node:22-alpine

WORKDIR /email

COPY --from=cache ./node_modules ./node_modules

COPY . .

EXPOSE 2096

# Start the application
CMD ["node", "server.js"]