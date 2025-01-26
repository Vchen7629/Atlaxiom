FROM node:22 AS builder

WORKDIR /app

ENV NPM_CONFIG_CACHE=/app/.npm

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

#prod image
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

RUN npm install -g serve

EXPOSE 443

CMD ["serve", "-s", "dist", "-l", "443", "--ssl-cert", "/etc/letsencrypt/live/atlaxiom.com/fullchain.pem", "--ssl-key", "/etc/letsencrypt/live/atlaxiom.com/privkey.pem", "--cors"]