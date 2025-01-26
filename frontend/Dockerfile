FROM ghcr.io/vchen7629/frontend-npm-cache:latest AS cache

FROM node:22-alpine

WORKDIR /app

COPY --from=cache /app/node_modules /app/

RUN if [ ! -d "node_modules" ]; then npm ci; fi

COPY . .

RUN npm run build

EXPOSE 443

CMD ["npx", "serve", "-s", "dist", "-l", "443", "--ssl-cert", "/etc/letsencrypt/live/atlaxiom.com/fullchain.pem", "--ssl-key", "/etc/letsencrypt/live/atlaxiom.com/privkey.pem", "--cors"]