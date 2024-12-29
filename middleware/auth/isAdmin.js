const jwt = require("jsonwebtoken");
const db = require("../../db/queries");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token provided" });
    const { username } = jwt.decode(token, process.env.JWT_SECRET_KEY);
    req.isAdmin = await db.verifyAdmin(username);
    next();
  } catch (err) {
    console.error(err);
    res
      .status(403)
      .json({ message: "Sorry, you are not allowed to access this page" });
  }
};

module.exports = isAdmin;
