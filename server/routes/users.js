const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//Get all the users
router.get('/', async (req,res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (err) {  
        //CODE 500 ERROR ON OUR SERVER
        res.status(500).json(err.message)
    }
})


// Get one user
router.get('/id', getUser, async (req,res) => {
   res.json(User)
})

// Create one
router.post('/', async (req,res) => {
    try {
        // Create Salt For Hashing
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.hashed_password, salt)

        //User Object
        const user = new User({
            user_id: req.body.user_id,
            email: req.body.email,
            hashed_password: hashedPassword,
            user_name: req.body.user_name,
            number_id: req.body.number_id,
            avatarURL_id: req.body.avatarURL_id, })
        const newUser = await user.save()
        
        //201 CODE CREATED SOMETHING SUCCESSFUL
        res.status(201).json(newUser)
    }
    catch (error) {
        //400 IF USER PUT IN WRONG INPUT
        res.status(400).json({message: error.message})
    }
})

// Update one
router.patch('/:id', getUser, async (req,res) => {
    if (req.body.username != null) {
        res.user.username = req.body.userame
    }
    if (req.body.number_id != null) {
        res.user.number_id = req.body.number_id
    }
    if (req.body.avatarURL_id != null) {
        res.user.avatarURL_id = req.body.avatarURL
    }

    try {
        const updateUser = await res.user.save()  
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Delete one
router.delete('/:id', getUser, async (req,res) => {
    try {
        await res.user.remove()
        res.status(204).json({message: 'User deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: 'User not found'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }

    res.user = user
    next()
}

module.exports = router