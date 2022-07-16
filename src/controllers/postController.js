const Post = require('../models/postModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const {
  createPost,
  getPost,
  updatePost,
  likeActions,
  getUserPosts,
} = require('../services/postService')

const postController = {
  createPost: async (req, res) => {
    try {
      const newPost = await createPost(req.body)
      if (newPost)
        return res.json({
          success: true,
          message: 'Post created!',
          post: newPost,
        })
      else
        return res
          .status(400)
          .json({ success: false, message: 'UserId is required' })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  },
  getPost: async (req, res) => {
    const id = req.params.id

    try {
      const post = await getPost(id)

      post
        ? res.json({ success: true, post })
        : res.status(400).json({ success: false, message: 'Post not found' })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  },
  updatePost: async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body

    try {
      const { success, message, status } = await updatePost(
        postId,
        userId,
        req.body
      )
      res.status(status).json({ success, message })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  },
  likeActions: async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body

    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: 'UserId is required!' })

    try {
      const { status, message } = await likeActions(postId, userId)

      res
        .status(status)
        .json({ success: status === 200 ? true : false, message })
    } catch (error) {}
  },
  getTimelinePosts: async (req, res) => {
    const userId = req.params.userId
    try {
      const currentUserPosts = await Post.find({ userId })
      const followingPosts = await User.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: 'posts',
            localField: 'followings',
            foreignField: 'userId',
            as: 'followingPosts',
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ])

      res.json({
        success: true,
        posts: [...currentUserPosts, ...followingPosts[0].followingPosts].sort(
          (a, b) => b.createdAt - a.createdAt
        ),
      })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error' })
    }
  },
  getUserPosts: async (req, res) => {
    const { userId } = req.params

    try {
      const posts = await getUserPosts(userId)
      res.json({ success: true, posts })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  },
}

module.exports = postController
