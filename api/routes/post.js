const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { verifyToken } = require("../utils/verifyToken");

// Create
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Post({ ...req.body, userId: req.userId });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(400).json("Error Create Post !!~");
  }
});

// Update
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body }, { new: true });
      res.status(200).json("Updated Post Success ☻♥");
    } else res.status(500).json("you can update only your post !!~~");
  } catch (error) {
    res.status(400).json("Error Update Post !!~");
  }
});

// Delete (pID)
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId !== req.userId)
      return res.status(404).json("You can delete only your post !~!");

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send("post Deleted ☻♥");
  } catch (error) {
    res.status(500).json("Error Delete post !!~");
  }
});

// Get (pID)
router.get("/get/:id", async (req, res) => {
  try {
    const getPost = await Post.findById(req.params.id);
    res.status(200).json(getPost);
  } catch (error) {
    res.status(400).json("Error Get Post !!~");
  }
});

// Get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Posts (timeline) (friendPosts) ||without send userId in body||
// router.get("/timeline", verifyToken, async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.userId);
//     const userPosts = await Post.find({ userId: currentUser._id });
//     const friendPosts = await Promise.all(
//       currentUser.followings.map((friendId) => {
//         return Post.find({ userId: friendId });
//       })
//     );
//     res.json(userPosts.concat(...friendPosts));
//   } catch (error) {
//     res.status(400).json("Error Get TimeLine Posts !!@@");
//   }
// });
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(400).json("Error Get TimeLine Posts !!@@");
  }
});

// like + dislike a Post (pID)
router.put("/likedis/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.userId)) {
      await post.updateOne({ $push: { likes: req.userId } });
      res.status(200).json("liked Post ♥");
    } else {
      await post.updateOne({ $pull: { likes: req.userId } });
      res.status(200).json("DisLiked  Post ☻");
    }
  } catch (error) {
    res.status(500).json("Error likedis Post !!~~");
  }
});

module.exports = router;
