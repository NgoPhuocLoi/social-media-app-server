const router = require('express').Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  },
})

const upload = multer({ storage })

router.post('/image', upload.single('file'), (req, res) => {
  try {
    return res.json('abc')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
