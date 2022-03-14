const express = require('express')
const router = express.Router()
const User = require('../models/user')

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
router.get('/:id', (req,res) => {

})
// Create one
router.post('/', (req,res) => {
    
})
// Update one
router.patch('/:id', (req,res) => {
    
})
// Delete one
router.post('/', (req,res) => {
    
})
module.exports = router