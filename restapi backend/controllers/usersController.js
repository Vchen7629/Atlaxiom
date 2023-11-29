const { OwnedCard, User } = require('../models/genmodels');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');


// @desc create a new users
// @route POST /user
// @access private
const createNewUser = asyncHandler(async (req, res) => {

    const { username, email, password} = req.body

    // confirm data
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    // check for duplicate users
    const duplicate = await User.findOne({ username, email}).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'duplicate users' })
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10) //salt rounds for password encryptions

    // create and store new user object
    const userObject = { username, email, "password": hashPassword, roles: ["Member"]}
    const user = await User.create(userObject)

    if (user) { //created
        res.status(201).json({ message: `new user ${username} with email ${email} created`})
    } else {
        res.status(400).json({ message: "Invalid user data recieved"})
    }
    
})

// @desc Get all users
// @route GET /user
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



// @desc update a user
// @route PATCH /user
// @access private
const updateUser = asyncHandler(async (req, res) => {

    const { id, username, email, roles, active, password } = req.body

    // Confirm data 
    if (!id || !username || !email || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()

    // allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.email = email
    user.roles = roles
    user.active = active

    if (password) {
        //Hash password
        user.password = await bcrypt.hash(password, 10) //10 salt rounds
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} with email ${updatedUser.email}updated`})

})

// @desc delete a user
// @route DELETE /user
// @access private
const deleteUser = asyncHandler(async (req, res) => {
    
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const ownedCards = await OwnedCard.findOne({ user_ids: id }).lean().exec();

    if (user.ownedCards && user.ownedCards.length > 0) {
        return res.status(400).json({ message: 'User has owned cards, cannot delete' });
    }

    console.log('Owned Cards:', ownedCards);

    const result = await user.deleteOne()

    res.json({message: `Username ${result.username} with ID ${result._id} deleted` })

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}