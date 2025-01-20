FROM node:22 

WORKDIR /app

COPY package*json ./

RUN npm install

COPY . .

# Expose the port the app runs on
EXPOSE 3005

# Start the application
CMD ["npm", "run", "dev"]