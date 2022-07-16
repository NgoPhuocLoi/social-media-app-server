const Room = require('../models/roomModel')

const roomController = {
  createRoom: async (req, res) => {
    const { senderId, receiverId } = req.body
    if (!senderId)
      return res
        .status(400)
        .json({ success: false, message: "Sender's ID not found" })
    if (!receiverId)
      return res
        .status(400)
        .json({ success: false, message: "Receiver's ID not found" })
    try {
      const newRoom = new Room({
        members: [senderId, receiverId],
      })

      await newRoom.save()
      return res.json({
        success: true,
        room: newRoom,
        message: 'Room created!',
      })
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAllUserRooms: async (req, res) => {
    const { userId } = req.params
    try {
      const rooms = await Room.find({ members: { $in: [userId] } })

      return res.json({ success: true, rooms })
    } catch (error) {
      res.status(500).json(error)
    }
  },
  findSpecificRoom: async (req, res) => {
    const { firstId, secondId } = req.params

    try {
      const room = await Room.find({
        members: { $all: [firstId, secondId] },
      })

      return res.json({ success: true, room })
    } catch (error) {
      res.status(500).json(error)
    }
  },
}

module.exports = roomController
