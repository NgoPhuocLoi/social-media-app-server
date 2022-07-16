const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: String,
    likes: [],
    image: String,
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
