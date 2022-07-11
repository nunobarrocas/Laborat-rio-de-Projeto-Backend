const User = require('../models/user')
//var mailer = require('../utils/Mailer')
const token = require('../utils/token')
//const crypto = require('crypto')

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                success: false,
                msg: 'Email already in use. Please login to continue'
            })
        } 

        const user = new User({
            name, email, password, avatar
        })       

        user.save(function (err, user) {
            if (err) return next(err)
            res.status(201).json({
                success: true,
                msg: 'Account created succesfully. Please Login'
            })
        })


        // })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: 'Server having some issues'
        })
    }
}

const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: token(user._id)
        })
    } else {
        res.status(401).json({
            success: false,
            msg: 'Unauthorized user'
        })
    }
}

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.header._id);    

    if (user)  {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        })
    } else {
        res.status(401).json({
            success: false,
            msg: 'Unauthorized user'
        })
    }
}

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.header._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.password = req.body.password || user.password;
        user.avatar = req.body.avatar || user.avatar;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            token: token(updatedUser._id)
        })
    } else {
        res.status(404).json({
            success: false,
            msg: 'User not found'
        })
    }
}


module.exports = {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile
}