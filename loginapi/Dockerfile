# Cache npm dependencies
FROM node:22 AS cache

WORKDIR /loginapi

COPY package*.json ./

RUN npm ci

FROM node:22

WORKDIR /loginapi

COPY --from=cache /loginapi/node_modules ./node_modules

COPY . .

EXPOSE 8443

# Start the application
CMD ["node", "server.js"]