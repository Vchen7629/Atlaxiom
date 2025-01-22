FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g serve

RUN npm run build

EXPOSE 443

CMD ["serve", "-s", "dist", "-l", "443", "--ssl-cert", "/etc/letsencrypt/live/atlaxiom.com/fullchain.pem", "--ssl-key", "/etc/letsencrypt/live/atlaxiom.com/privkey.pem", "--cors"]