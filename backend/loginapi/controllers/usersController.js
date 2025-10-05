const { User, OwnedCard } = require('../models/genmodels');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

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
        authType: "local", // either google or local, just to differentiate between oauth and username/password signup
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

// @desc Get a specific user
// @route GET /users
// @access private
const getSpecificUser = asyncHandler(async (req, res) => {
    const userId = req.userId

    if (!userId || userId === "null") {
        return res.status(400).json({ message: "Invalid user ID provided" });
    }

    // Find the user with the specified id
    const user = await User.findById(userId).select('-password').lean();

    // If no user found
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});



// @desc update a user
// @route PATCH /user
// @access private
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.userId
    const { username, email, password } = req.body

    // Confirm data 
    if ( !username && !email && !password ) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(userId).exec()

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    // check for duplicate
    if (username && username === user.username) {
        return res.status(409).json({ message: 'Cannot update to the same username' });
    }

    if (username && username !== user.username) {
        user.username = username
    }

    if (email && email === user.email) {
        return res.status(409).json({ message: 'Cannot update to the same email' });
    }

    if (email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|io)$/;

        if (!emailRegex.test(email)) {
            return res.status(422).json({ message: 'Invalid email format' });
        }

        // Check if the email is already taken
        const emailTaken = await User.findOne({ email }).lean().exec();
        if (emailTaken && emailTaken._id.toString() !== userId) {
            return res.status(409).json({ message: 'Duplicate email' });
        }

        user.email = email;
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
// @route DELETE /user
// @access private
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.userId

    if (!userId) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Does the user exist to delete?
    const user = await User.findById(userId).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Delete all documents with the same user_id
    await OwnedCard.deleteMany({ user_id: user._id });

    await user.deleteOne()

    res.json({message: `Username ${user.username} with ID ${user._id} deleted` })

})


module.exports = {
    getSpecificUser,
    createNewUser,
    updateUser,
    deleteUser,
}