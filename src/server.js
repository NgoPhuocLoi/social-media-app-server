const app = require('./app')

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

let activeUsers = []

io.on('connection', (socket) => {
  socket.on('new-user-add', (newUserId) => {
    if (!activeUsers.some((user) => user._id === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      })
    }
    io.emit('get-users', activeUsers)
  })

  socket.on('send-message', (data) => {
    const { receiverId } = data
    const user = activeUsers.find((user) => user.userId === receiverId)

    if (user) {
      io.to(user.socketId).emit('receive-message', data)
    }
  })

  socket.on('disconnect', () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
    io.emit('get-users', activeUsers)
  })
})
