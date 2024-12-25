const db = require("../db/queries");
const jwt = require("jsonwebtoken");

const getUserName = async (req) => {
  try {
    const bearer = req.rawHeaders.filter((header) => header.includes("token"))[0];
    const token = bearer.split("=")[1];
    const { username } = jwt.decode(token, process.env.JWT_SECRET_KEY);
    return username;
  } catch (err) {
    console.error(err);
  }
  return false;
};

const getPost = async (req, res) => {
  const title = req.params.title.split("-").join(" ");
  try {
    const post = await db.getPost(title);
    if (post) {
      res.json({
        post,
      });
    } else {
      res.json({
        error: "Post not found!",
      });
    }
  } catch (err) {
    console.error(err);
    res.json({
      error: "Error occurred while retrieving post!",
    });
  }
};

const addComment = async (req, res) => {
  const title = req.params.title.split("-").join(" ");
  const { comment } = req.query;
  try {
    const username = await getUserName(req);
    if (username) {
      const status = await db.addComment(username, comment, title);
      if (status === true) {
        res.json({
          success: "Comment added successfully!",
        });
      }
    } else {
      res.json({
        message: "You must login to comment on a post!",
      });
    }
  } catch (err) {
    console.error(err);
    res.json({
      error: "Error adding comment! Try again!",
    });
  }
};

const getAllPosts = async (req, res) => {
  const posts = await db.getAllPosts();
  if (posts) {
    res.json(posts);
  } else {
    res.json({ error: "Error occurred! Try again!" });
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const result = await db.createPost(title, content);
  if (result) {
    res.json({
      message: "Post created!",
    });
  } else {
    res.json({
      error: "Error creating new post",
    });
  }
};

const updatePost = async (req, res) => {
  const { title, updatedTitle, updatedContent } = req.body;
  if (title && updatedTitle && updatedContent) {
    const status = await db.updatePost(title, updatedTitle, updatedContent);
    if (status) {
      res.json({
        message: "Post updated successfully!",
      });
    } else {
      res.json({
        error: "Error updating the post! Try again!",
      });
    }
  } else {
    res.json({
      message: "Please modify the post to update it!",
    });
  }
};

const deletePost = async (req, res) => {
  const title = req.params.title.split("-").join(" ");
  const status = await db.deletePost(title);
  if (status) {
    res.json({
      message: "Deleted successfully!",
    });
  } else {
    res.json({
      error: "There was a problem in deleting the Post! Please try again!",
    });
  }
};

const likePost = async (req, res) => {
  const title = req.params.title.split("-").join(" ");
  const username = await getUserName(req);
  try {
    const response = await db.likePost(title, username);
    res.json({
      response,
    });
  } catch (err) {
    res.json({
      error: "Error occurred! Try again later!",
    });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost,
  getPost,
};
