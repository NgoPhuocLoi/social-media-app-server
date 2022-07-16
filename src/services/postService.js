const Post = require('../models/postModel')

const postServices = {
  createPost: async (postInfo) => {
    try {
      const newPost = new Post(postInfo)
      return await newPost.save()
    } catch (error) {
      console.log(error)
    }
  },
  getPost: async (postId) => {
    try {
      return await Post.findById(postId)
    } catch (error) {
      console.log(error)
    }
  },
  updatePost: async (postId, userId, newPostInfo) => {
    const result = {
      success: true,
      message: '',
      status: 200,
    }
    try {
      const post = await Post.findById(postId)

      if (!post) {
        result.message = 'Post not found'
        result.success = false
        result.status = 400
        return result
      }

      if (userId === post.userId) {
        await post.updateOne({ $set: newPostInfo })
        result.message = 'Post updated'
      } else {
        ;(result.success = false), (result.message = 'Action denied')
        result.status = 403
      }
      return result
    } catch (error) {}
  },
  likeActions: async (postId, userId) => {
    const result = {
      status: 200,
      message: '',
    }
    try {
      const post = await Post.findById(postId)

      if (!post) {
        result.status = 400
        result.message = 'Post not found'

        return result
      }

      if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } })
        result.message = 'Post liked'
      } else {
        await post.updateOne({ $pull: { likes: userId } })
        result.message = 'Post unLiked'
      }

      return result
    } catch (error) {
      console.log(error)
    }
  },
  getUserPosts: async (userId) => {
    try {
      const posts = await Post.find({ userId })
      return posts
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = postServices
