const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const isAdmin = require("../middleware/auth/isAdmin")

router.get("/", postController.getAllPosts);
router.get("/post/:title", postController.getPost);
router.post("/posts/new", isAdmin, postController.createPost);
router.post("/posts/update", isAdmin, postController.updatePost);
router.post("/posts/delete/:title", isAdmin, postController.deletePost);
router.get("/posts/:title/comment", postController.addComment);
router.post("/post/:title/like", postController.likePost);
module.exports = router;
