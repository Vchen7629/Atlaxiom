const User = require('../models/User')
const Card = require('../models/OwnedCards')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

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

// @desc create a new users
// @route POST /user
// @access private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles} = req.body

    // confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    // check for duplicate users
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'duplicate users' })
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10) //salt rounds for password encryptions

    const userObject = { username, "password": hashPassword, roles}

    // create and store new user object
    const user = await User.create(userObject)

    if (user) { //created
        res.status(201).json({ message: `new user ${username} created`})
    } else {
        res.status(400).json({ message: "Invalid user data recieved"})
    }
})

// @desc update a user
// @route PATCH /user
// @access private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
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
    if (duplicate && duplicate?._id.toString !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        //Hash password
        user.password = await bcrypt.hash(password, 10) //10 salt rounds
    }

    const updatedUser = await user.save()

    res.json({ message: `${updateUser.username} updated`})
})

// @desc delete a user
// @route DELETE /user
// @access private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user have any owned cards??
    const OwnedCards = await Card.findOne({ user: id}).lean().exec()
    if (card?.length) {
        return res.status(400).json({ message: 'User already has owned cards'})
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result.id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}