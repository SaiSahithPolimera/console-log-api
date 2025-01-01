const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const isAdmin = require("../middleware/auth/isAdmin")

router.get("/", postController.getAllPosts);
router.get("/post/:title", postController.getPost);
router.post("/post", isAdmin, postController.createPost);
router.put("/post", isAdmin, postController.updatePost);
router.delete("/post/:title", isAdmin, postController.deletePost);
router.post("/posts/:title/comment", postController.addComment);
router.post("/post/:title/like", postController.likePost);
module.exports = router;
