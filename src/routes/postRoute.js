const router = require('express').Router()
const {
  createPost,
  getPost,
  updatePost,
  likeActions,
  getTimelinePosts,
  getUserPosts,
} = require('../controllers/postController')

router.post('/create', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.put('/:id/likeActions', likeActions)
router.get('/:userId/timeline', getTimelinePosts)
router.get('/:userId/user', getUserPosts)

module.exports = router
