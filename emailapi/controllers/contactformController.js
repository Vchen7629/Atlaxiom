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
    console.time('total-request');
    const { username, email, subject, body } = req.body

    if (!email || !username || !subject || !body) {
        console.timeEnd('total-request');
        return res.status(400).json({ 
            message: 'No email, username, subject, or body provided',
            missingFields: ['email', 'username', 'subject', 'body'].filter(field => !req.body[field])
        })
    }

    console.time('get-api-key');
    const API_KEY = getSecret(process.env.API_KEY_FILE, process.env.API_KEY);
    console.timeEnd('get-api-key');

    if (!API_KEY) {
        console.timeEnd('total-request');
        throw new Error('Api key is missing.');
    }

    try {
        console.time('lambda-call');
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
        }, 10000); // 10 second timeout

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
                signal: controller.signal
            }
        );
        clearTimeout(timeout);
        console.timeEnd('lambda-call');

        if (!Lambda.ok) {
            console.timeEnd('total-request');
            return res.status(400).json({ message: "Failed to send email" });
        }

        console.time('lambda-response-parse');
        const LambdaData = await Lambda.json();
        console.timeEnd('lambda-response-parse');

        console.timeEnd('total-request');
        return res.status(200).json({ message: "Successfully called Lambda", LambdaData});
    } catch (error) {
        console.timeEnd('total-request');
        console.error('Lambda request failed:', error);
        if (error.name === 'AbortError') {
            return res.status(504).json({ message: "Request timed out" });
        }
        return res.status(500).json({ message: "Failed to send reset email" });
    }
})

module.exports = {
    SendContactEmail
}