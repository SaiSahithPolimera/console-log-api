const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");
const isAdmin = require("../middleware/auth/isAdmin");

router.get("/tags",  tagsController.getAllTags);
router.post("/tags", isAdmin, tagsController.addTag);
router.get("/tags/:tag", tagsController.getPostsByTag);

module.exports = router;