# Cache npm dependencies
FROM node:22 AS cache

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

FROM node:22

WORKDIR /loginapi

COPY --from=cache /loginapi/node_modules /loginapi/

COPY . .

EXPOSE 8443

# Start the application
CMD ["node", "server.js"]