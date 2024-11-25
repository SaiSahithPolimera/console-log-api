const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/posts", postController.getAllPosts);
router.post("/posts/new", postController.createPost);
router.post("/posts/update", postController.updatePost);
router.post("/posts/delete/:title", postController.deletePost);

module.exports = router;
