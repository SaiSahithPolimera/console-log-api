const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const db = require("../db/queries");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = 9;

const login = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const filteredErrors = errors.map(
      (err) => (err = { fieldName: err.path, message: err.msg })
    );
    return res.json({ errors: filteredErrors });
  }
  const { username, password } = req.body;
  const userData = await db.getUserCredentials(username);
  const isAdmin = userData.role === "ADMIN" ? true : false;
  if (userData) {
    const isValid = await bcrypt.compare(password, userData.password);
    if (isValid === true) {
      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'None'
      });
      res.json({
        status: true,
        isAdmin: isAdmin,
        message: "Login success!",
      });
    } else {
      res.json({
        success: false,
        message: "Incorrect password!",
      });
    }
  } else {
    res.json({
      success: false,
      message: "User not found!",
    });
  }
};

const signup = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const filteredErrors = errors.map(
      (err) => (err = { fieldName: err.path, message: err.msg })
    );
    res.json({ errors: filteredErrors });
  }
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  if (username && hashedPassword && email) {
    try {
      const message = await db.createUser(username, hashedPassword, email);
      if (message === "success") {
        res.json({
          success: true,
        });
      } else {
        res.json({
          message: message,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = { login, signup };
