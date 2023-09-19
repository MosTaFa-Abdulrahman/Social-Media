const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const router = express.Router();
const { verifyToken } = require("../utils/verifyToken");

// Create
router.post("/create", verifyToken, async (req, res, next) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.userId });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(400).json("Error Create Comment !!");
  }
});

// Delete (commentId)
router.delete("/delete/:commentId", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    await Post.findByIdAndUpdate(req.body.postId);
    res.status(200).json("Comment Deleted ☻♥");
  } catch (error) {
    res.status(500).json("Error Delete Comment !!~");
  }
});

// Get All Comments (postId)
router.get("/get/:postId", async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(403).json("Error Get All Comments !!");
  }
});

module.exports = router;
