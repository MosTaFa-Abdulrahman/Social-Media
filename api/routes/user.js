const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Update
router.put("/update/:id", async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json("Error Update User !~~!");
  }
});

// Delete
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    try {
      await Post.deleteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete User Successful ☻♥");
    } catch (error) {
      res.status(500).json(error.message);
    }
  } catch (error) {
    res.status(403).json("User not found ~!");
  }
});

// Get User By ID
router.get("/get/:id", async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (error) {
    res.status(400).json("Error Get User By ID !~~!");
  }
});

// Get ALL User
router.get("/find", async (req, res) => {
  try {
    const getAllUsers = await User.find().limit(3);
    res.status(200).json(getAllUsers);
  } catch (error) {
    res.status(500).json("Error Get ALL Users !!~");
  }
});

// Get
router.get("/get", async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const getUser = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { password, updatedAt, ...others } = getUser._doc; // Hidden (Password,updatedAt) from Postman
    res.status(200).json({ ...others });
  } catch (error) {
    res.status(400).json("Error Get User By Query !~~!");
  }
});

// Get User Friends ((my Followings))
router.get("/get/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json("Error Get Friends !!!");
  }
});

// Follow
router.put("/:id/follow", async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("Follow ☻");
      } else res.status(403).json("you already follow this user !!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else res.status(403).json("you can not follow yourself !~");
});

// UnFollow
router.put("/:id/unfollow", async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("Un Follow ☻");
      } else res.status(403).json("you already unFollow this user !!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else res.status(403).json("you can not unFollow yourself !~");
});

module.exports = router;
