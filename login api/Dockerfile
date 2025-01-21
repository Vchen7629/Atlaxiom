FROM node:22 

WORKDIR /login api

COPY package*json ./

RUN npm install

COPY . .

# Expose the port the app runs on
EXPOSE 443

# Start the application
CMD ["npm", "run", "dev"]