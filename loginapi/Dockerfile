FROM node:22-alpine

WORKDIR /loginapi

COPY package*.json ./

RUN --mount=type=cache,target=/app/node_modules npm ci --only=production

COPY . .

EXPOSE 8443

# Start the application
CMD ["node", "server.js"]