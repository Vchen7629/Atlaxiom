# Cache npm dependencies
FROM node:22-alpine AS cache

COPY package*.json ./

RUN npm ci --include=dev

#build stage

FROM node:22-alpine

WORKDIR /app

COPY --from=cache ./node_modules ./node_modules

COPY . .

RUN npm install -g serve && npm run build

EXPOSE 443

CMD ["serve", "-s", "dist", "-l", "443", "--ssl-cert", "/etc/letsencrypt/live/atlaxiom.com/fullchain.pem", "--ssl-key", "/etc/letsencrypt/live/atlaxiom.com/privkey.pem", "--cors"]