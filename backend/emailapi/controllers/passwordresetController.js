const User = require('../models/User');
const PasswordResetTokenSchema = require('../models/passwordResetToken');
const crypto = require('crypto')
const fetch = require('node-fetch');
const { dynamoDB } = require("../config/DynamoDBConn")
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
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

// @desc Generate token to be sent with the email to be used to verify Password Reset Page
// @route POST /token
// @access Public
const PasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: 'No email provided' });
    }
    
    const foundUser = await User.findOne({ email }).exec();

    if (!foundUser) {
        return res.status(200).json({ 
            message: 'If an account exists with this email, you will receive reset instructions' 
        });
    }
    
    const filterbyemail = new GetCommand({
        TableName: "email-bounces",
        Key: {
            email
        }
    });

    const API_KEY = getSecret(process.env.API_KEY_FILE, process.env.API_KEY);

    if (!API_KEY) {
        throw new Error('Api key is missing.');
    }
    
        try {
            const response = await dynamoDB.send(filterbyemail);
            
            if (!response.Item) {
                const resetToken = crypto.randomBytes(32).toString('hex');
                
                const token = await PasswordResetTokenSchema.findOneAndUpdate(
                    { email },
                    {
                        token: resetToken,
                        sessionId: null,
                        createdAt: Date.now()
                    },
                    {
                        new: true,
                        upsert: true
                    }
                );
                
                if (token) {
                    try {
                        const Lambda = await fetch(
                            "https://1e9a40ob22.execute-api.us-west-1.amazonaws.com/Prod/password",
                            {
                                method: "POST",
                                headers: {
                                    'content-type': 'application/json',
                                    'x-api-key': API_KEY
                                },
                                body: JSON.stringify({
                                    email,
                                    username: foundUser.username,
                                    token: token.token,
                                })
                            }
                        );
                        const LambdaData = await Lambda.json();
                        return res.status(200).json({ message: "Successfully called Lambda", LambdaData});
                    } catch (error) {
                        return res.status(500).json({ message: "Failed to send reset email" });
                    }
                } else {
                    return res.status(400).json({ message: "Invalid user data received" });
                }
            }
            
            if (response.Item) {
                return res.status(400).json({ message: "Email bounced in the past"});
            }
        } catch (error) {
            return res.status(500).json({ message: "Error checking email status" });
        }
})

// @desc Verify the Reset Token passed from lambda is valid and set a sessionId to it so it cant be used again
// @route PATCH /validate-token
// @access Public
const VerifyResetToken = async (req, res) => {
    const { token } = req.body

    const existingToken = await PasswordResetTokenSchema.findOne({ token }).exec();

    if (!existingToken) {
        return res.status(404).json({ message: "Invalid or expired Password Reset Link"})
    }

    if (existingToken.sessionId) {
        console.log('Reusing existing sessionId:', existingToken.sessionId);
        res.cookie('session', existingToken.sessionId, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 900000
        });
        return res.status(200).json({ message: "Valid reset Link" });
    }

    const sessionId = crypto.randomBytes(32).toString('hex');
    
    const updatedToken = await PasswordResetTokenSchema.findOneAndUpdate(
        { token, sessionId: null },
        { sessionId },
        { new: true }
    )


    if (!updatedToken) {
        return res.status(404).json({ message: "Token has already been used" });
    }

    res.cookie('session', sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 900000
    })

    res.status(200).json({ message: "Valid reset Link" });
};

// @desc Verify the Reset Token is valid and rest Password
// @route POST /validate-token/:token
// @access Public
const ResetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;
    const sessionId = req.cookies.session;

    if (!sessionId) {
        return res.status(401).json({ message: "invalid session" })
    }

    const checkTokenSessionId = await PasswordResetTokenSchema.findOne({
        token,
        sessionId
    }).exec();

    if (!checkTokenSessionId) {
        return res.status(401).json({ message: "Invalid Reset Attempt"})
    }

    const user = await User.findOne({ email: checkTokenSessionId.email });
    console.log("User hi", user)
    if (user) {
        user.password = newPassword;
        const save = await user.save();
        console.log("saved status is", save)

        await PasswordResetTokenSchema.deleteOne({ token });

        res.clearCookie("session");

        return res.status(200).json({ message: "Password successfully reset" })
    } else {
        return res.status(404).json({ message: "User not found"})
    }

})


module.exports = {
    PasswordToken,
    VerifyResetToken,
    ResetPassword
}