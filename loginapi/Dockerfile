FROM node:22 

WORKDIR /loginapi

COPY package*json ./

RUN npm install --production

COPY . .

EXPOSE 8443

# Start the application
CMD ["node", "server.js"]