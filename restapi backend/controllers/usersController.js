const { OwnedCard, User } = require('../models/genmodels');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc create a new users
// @route POST /user
// @access private
const createNewUser = asyncHandler(async (req, res) => {
    try {
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

        // create and store new user object
        const userObject = { username, "password": hashPassword, roles}
        const user = await User.create(userObject)

        if (user) { //created
            res.status(201).json({ message: `new user ${username} created`})
        } else {
            res.status(400).json({ message: "Invalid user data recieved"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})

// @desc Get all users
// @route GET /user
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        // Get all users from MongoDB
        const users = await User.find().select('-password').lean()

        // If no users 
        if (!users?.length) {
            return res.status(400).json({ message: 'No users found' })
        }

        res.json(users)

    }   catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})



// @desc update a user
// @route PATCH /user
// @access private
const updateUser = asyncHandler(async (req, res) => {
    try {
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
        if (duplicate && duplicate?._id.toString() !== id) {
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

        res.json({ message: `${updatedUser.username} updated`})

    }   catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})

// @desc delete a user
// @route DELETE /user
// @access private
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { username } = req.body

        // Confirm data
        if (!username) {
            return res.status(400).json({ message: 'username required' })
        }

        // Does the user exist to delete?
        const user = await User.findOne({ username }).exec();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //Check to see if the user has owned cards
        const ownedCards = await OwnedCard.findOne({ user_ids: user._id }).lean().exec();

        if (ownedCards && ownedCards.ownedCards.length > 0) {
            return res.status(400).json({ message: 'User has owned cards, cannot delete' });
        }

        // Delete the user
        const result = await user.deleteOne();
        
        res.json({ message: `User ${username} deleted` });
        
    }   catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}