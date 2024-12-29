const { User, OwnedCard } = require('../../login api/models/genmodels');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');


// @desc create a new users
// @route POST /user/newuser
// @access private
const createNewUser = asyncHandler(async (req, res) => {

    const { username, email, password} = req.body

    // confirm data
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    // check for duplicate users
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: "Username Taken, please choose another" })
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10) //salt rounds for password encryptions

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const creationDate = `${formattedDate}`

    // create and store new user object
    const userObject = { 
        username, 
        email, 
        "password": hashPassword, 
        roles: ["Member"], 
        creation: creationDate,
        lastUpdated: null,
        lastUsernameUpdated: creationDate,
        lastCardUpdated: creationDate,
        uniqueCards: 0,
    }

    const user = await User.create(userObject)

    if (user) { //created
        res.status(201).json({ message: `new user ${username} with email ${email} created`})
    } else {
        res.status(400).json({ message: "Invalid user data recieved"})
    }
})

// @desc Get all users
// @route GET /users
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)

})

// @desc Get a specific user
// @route GET /users/:id
// @access private
const getspecificuser = asyncHandler(async (req, res) => {
    // Extract username from the request parameters
    const { id } = req.params

    // Find the user with the specified id
    const user = await User.findById(id).select('-password').lean();

    // If no user found
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});



// @desc update a user
// @route PATCH /users/:id
// @access private
const updateUser = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { username, email, password } = req.body

    // Confirm data 
    if ( !username && !email && !password ) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // check for duplicate
    if (username && username!== user.username) {
        const duplicate = await User.findOne({ username }).lean().exec()
        if (duplicate && duplicate?._id.toString() !== id) {
            return res.status(409).json({ message: 'Duplicate username' })
        }
        user.username = username
    }

    if (email) {
        user.email = email
    }

    if (password) {
        //Hash password
        user.password = await bcrypt.hash(password, 10) //10 salt rounds
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const formattedTime = now.toTimeString().split(' ')[0];

    user.lastUpdated = `${formattedDate} ${formattedTime}`;

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} with email ${updatedUser.email} updated`})

})

// @desc delete a user
// @route DELETE /user/:id
// @access private
const deleteUser = asyncHandler(async (req, res) => {
    
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Delete all documents with the same user_id
    const deleteRelatedDocuments = await OwnedCard.deleteMany({ user_id: user._id });

    if (deleteRelatedDocuments.deletedCount === 0) {
        return res.status(404).json({ message: 'No related documents found to delete' });
    }

    const result = await user.deleteOne()

    res.json({message: `Username ${user.username} with ID ${user._id} deleted` })

})


module.exports = {
    getAllUsers,
    getspecificuser,
    createNewUser,
    updateUser,
    deleteUser,
}