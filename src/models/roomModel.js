const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
  {
    members: Array,
  },
  { timestamps: true }
)

const roomModel = mongoose.model('rooms', roomSchema)

module.exports = roomModel
