# Atlaxiom
![Frontend](https://img.shields.io/badge/Frontend-React/Typescript/HTML/CSS-orange)
![BACKEND](https://img.shields.io/badge/Backend-Javascript/Express/Node-purple)
![Database](https://img.shields.io/badge/Database-MongoDB-red)
![NPM](https://img.shields.io/badge/NPM-23.6.1-blue)
![API](https://img.shields.io/badge/API-YGOPRODeck-fcba03)

All-in-one Yu-Gi-Oh! Database, Deck Builder and Collection Manager app.

## Features

- [ ] Search up yugioh cards and view card details.
- [ ] Create user accounts to save your card collections.
- [ ] Create decks with drag and drop.
- [ ] View user metrics via charts.

## Getting Started

This project requires the following dependencies if you want to build and run it yourself.
* MongoDB Database URI

To build and run first clone the project

```
git clone https://github.com/Vchen7629/Atlaxiom.git
```

### Build and Run (Frontend)

1. Install Dependencies

    ```
    cd frontend
    ```
    ```
    npm install
    ```

2. Run the Project 
    ```
    npm run dev
    ```

    Note: If you want to run the frontend and connect it to a backend database server, change the baseUrl Value in [apiSlice file](https://github.com/Vchen7629/Atlaxiom/blob/main/frontend/src/app/api/apiSlice.ts)


### Build and Run (LoginApi)

1. Install Dependencies

    ```
    cd backend\loginapi
    ```
    ```
    npm install
    ```

2. Create a .env file with your mongodb database uri and put this inside

    - MONGODB_URI=Mongo DB URI HERE

    note: Set the environment to "test" for the const environment in [server.js file](https://github.com/Vchen7629/Atlaxiom/blob/main/backend/loginapi/server.js) for it to create a local node server

3. Run the Application

    ```
    npm run dev
    ```

### Infrastructure
The [Infrastructure folder](https://github.com/Vchen7629/Atlaxiom/tree/main/infrastructure) contains terraform code for provisioning AWS infra for the project,
- AWS S3
- AWS Lambda
- AWS CloudFront
- AWS Api Gateway

and the cloudflare domain. If you want to use this portion you would need: 
* Cloudflare Domain Zone and Account API Key
* AWS Access Keys with access to Lambda, S3, Api Gateway, Cloudfront
