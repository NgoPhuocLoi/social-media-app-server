const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const messageModel = mongoose.model('messages', messageSchema)

module.exports = messageModel
