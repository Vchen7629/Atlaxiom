const fetch = require('node-fetch');
const asyncHandler = require('express-async-handler');
const fs = require('fs')
require('dotenv').config();

const getSecret = (filePath, envVar) => {
    if (filePath && fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8').trim();
    } else {
        console.log("error 1")
    }
    
    return envVar || null;
};

// @desc Send a Contact Email Request to Lambda
// @route POST /token
// @access Public
const SendContactEmail = asyncHandler(async (req, res) => {
    try {
        const API_KEY = getSecret(process.env.API_KEY_FILE, process.env.API_KEY);

        if (!API_KEY) {
            throw new Error('Api key is missing.');
        }

        const { username, email, subject, body } = req.body

        if (!email || !username || !subject || !body) {
            return res.status(400).json({ 
                message: 'No email, username, subject, or body provided',
                missingFields: ['email', 'username', 'subject', 'body'].filter(field => !req.body[field]) 
            })
        }

        const Lambda = await fetch(
            "https://1e9a40ob22.execute-api.us-west-1.amazonaws.com/Prod/contact", {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': API_KEY
                },
                body: JSON.stringify({
                    email,
                    username,
                    subject,
                    body
                }),
            }
        )

        if (!Lambda.ok) {
            return res.status(400).json({ message: "Failed to send email" });
        }
        const LambdaData = await Lambda.json();
        return res.status(200).json({ message: "Successfully called Lambda", LambdaData});
    } catch (error) {
        return res.status(500).json({ 
            message: "Failed to send reset email",
            error: error.message
        });
    }
})

module.exports = {
    SendContactEmail
}