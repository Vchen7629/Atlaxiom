FROM node:22 

WORKDIR /login api

COPY package*json ./

RUN npm install

COPY . .

ENV PORT = 443

EXPOSE 443

# Start the application
CMD ["npm", "run", "dev"]