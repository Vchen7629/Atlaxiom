const mongoose = require('mongoose')
const fs = require('fs')


const connectMongoDB = async() => {
    try {
        const databaseURI = process.env.MONGODB_DATABASE_URI_FILE
        ? fs.readFileSync(process.env.MONGODB_DATABASE_URI_FILE, 'utf8').trim()
        : process.env.MONGODB_DATABASE_URI;

        if (!databaseURI) {
            throw new Error('DATABASE_URI is not set.');
        } await mongoose.connect(databaseURI);

        console.log('Database connected successfully!');
    } catch (err) {
        throw new Error("Error connecting to database")
    }
}

module.exports = connectMongoDB