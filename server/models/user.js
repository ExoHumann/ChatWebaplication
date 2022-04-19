const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
      type: String,
      required: true,
      min: 3,
      max: 21,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    number :{
      type : String,
      required: true,
      min: 8,
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarURL: {
      type: String,
      default: "",
    },
    
  });

module.exports = mongoose.model('User', userSchema)