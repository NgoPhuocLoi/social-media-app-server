const Message = require('../models/messageModel')

const messageController = {
  createMessage: async (req, res) => {
    const { roomId, senderId, text } = req.body

    if (!roomId || !senderId || !text)
      res.status(400).json({ success: false, message: 'Missing Information' })
    try {
      let newMessage = new Message({ roomId, senderId, text })

      newMessage = await newMessage.save()
      return res.json({ success: true, message: newMessage })
    } catch (error) {
      res.status(500).json({ success: false, message: error })
    }
  },
  getMessages: async (req, res) => {
    const { roomId } = req.params
    if (!roomId)
      return res
        .status(400)
        .json({ success: false, message: "Room's ID not found" })

    try {
      const messages = await Message.find({ roomId })
      return res.json({ success: true, messages })
    } catch (error) {
      res.status(500).json({ success: false, message: error })
    }
  },
}

module.exports = messageController
