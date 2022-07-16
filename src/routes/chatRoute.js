const {
  createMessage,
  getMessages,
} = require('../controllers/messageController')
const {
  createRoom,
  getAllUserRooms,
  findSpecificRoom,
} = require('../controllers/roomController')

const router = require('express').Router()

router.post('/create/room', createRoom)
router.post('/create/message', createMessage)
router.get('/:userId/rooms', getAllUserRooms)
router.get('/:roomId/message', getMessages)
router.get('/find/:firstId/:secondId/room', findSpecificRoom)

module.exports = router
