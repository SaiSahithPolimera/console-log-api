const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/posts", postController.getAllPosts);
router.post("/posts/new", postController.createPost);
router.post("/posts/update", postController.updatePost);
router.post("/posts/delete/:title", postController.deletePost);
router.get("/posts/:title/comment", postController.addComment);
module.exports = router;
