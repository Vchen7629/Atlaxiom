FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g http-server

RUN npm run build

EXPOSE 443

CMD ["http-server", "dist", "-S", "-C", "/etc/letsencrypt/live/atlaxiom.com/fullchain.pem", "-K", "/etc/letsencrypt/live/atlaxiom.com/privkey.pem", "-p", "443" "--cors"]