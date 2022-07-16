const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    liveIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    followings: [],
  },
  {
    timestamps: true,
  }
)

const userModel = mongoose.model('users', userSchema)

module.exports = userModel
