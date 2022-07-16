require('dotenv').config()
const express = require('express')
const cors = require('cors')
// database config
const db = require('./config/db')
//routes
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const uploadRoute = require('./routes/uploadRoute')
const chatRoute = require('./routes/chatRoute')

const app = express()

db.connect()

//to serve image for public
app.use(express.static('public'))
app.use('/images', express.static('images'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// routes
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/upload', uploadRoute)
app.use('/chat', chatRoute)

module.exports = app
