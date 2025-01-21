FROM node:22 

WORKDIR /loginapi

COPY package*json ./

RUN npm install

COPY . .

EXPOSE 8443

# Start the application
CMD ["npm", "run", "dev"]