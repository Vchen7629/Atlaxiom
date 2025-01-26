FROM ghcr.io/vchen7629/backend-npm-cache:latest AS cache

FROM node:22-alpine

WORKDIR /loginapi

COPY --from=cache /loginapi/node_modules /loginapi/

RUN if [ ! -d "node_modules" ]; then npm ci --only=production

COPY . .

EXPOSE 8443

# Start the application
CMD ["node", "server.js"]