const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    user_id: {
        type: String,
        required: true  
    },

    email: {
        type: String,
        required: true
    },

    hashed_password: {
        type: String,
        required: true
    },

    user_name: {
        type: String,
        required: true
    },

    number_id: {
        type: Number,
    },

    avatarURL_id:{
        type: String 
        // 'https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png',
        //required: true
    }
})

module.exports = mongoose.model('User', userSchema)