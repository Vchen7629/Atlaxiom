FROM node:22-alpine

WORKDIR /loginapi

COPY package*json ./

RUN npm install ci --production

COPY . .

EXPOSE 8443

# Start the application
CMD ["node", "server.js"]