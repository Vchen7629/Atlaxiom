FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g serve

#RUN npm run build

EXPOSE 443

CMD ["serve", "-s", "dist", "-l", "443"]