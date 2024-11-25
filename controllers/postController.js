const db = require("../db/queries");
const jwt = require("jsonwebtoken");

const checkAdmin = async (req) => {
  try {
    const bearer = req.headers.authorization;
    const token = bearer.split(" ")[1];
    const { username } = jwt.decode(token, process.env.JWT_SECRET_KEY);
    const isAdmin = await db.verifyAdmin(username);
    return isAdmin;
  } catch (err) {
    console.error(err);
    return false;
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
  const isAdmin = await checkAdmin(req);
  if (isAdmin) {
    const { title, content } = req.body;
    const result = await db.createPost(title, content.toString());
    if (result) {
      res.json({
        message: "Post created!",
      });
    } else {
      res.json({
        error: "Error creating new post",
      });
    }
  } else {
    res.json({
      error: "Sorry, you are not allowed to access this page",
    });
  }
};

const updatePost = async (req, res) => {
  const isAdmin = await checkAdmin(req);
  if (isAdmin) {
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
  } else {
    res.json({
      error: "Sorry, you are not allowed to access this page",
    });
  }
};

const deletePost = async (req, res) => {
  const isAdmin = await checkAdmin(req);
  if (isAdmin) {
    const { title } = req.params;
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
  } else {
    res.json({
      error: "Sorry, you are not allowed to access this page",
    });
  }
};

module.exports = { getAllPosts, createPost, updatePost, deletePost };
