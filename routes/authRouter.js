const express = require("express");
const router = express.Router();
const signUpValidator = require("../middleware/validators/signUpValidator");
const loginValidator = require("../middleware/validators/loginValidator");
const authController = require("../controllers/authController");

router.post("/login", loginValidator, authController.login);
router.post("/sign-up", signUpValidator, authController.signup);

module.exports = router;
