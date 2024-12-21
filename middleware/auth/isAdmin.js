const jwt = require("jsonwebtoken");
const db = require("../../db/queries");

const isAdmin = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) return res.status(401).json({ message: "No token provided" });
    const token = bearer.split(" ")[1];
    const { username } = jwt.decode(token, process.env.JWT_SECRET_KEY);
    req.isAdmin = await db.verifyAdmin(username);
    next();
  } catch (err) {
    res
      .status(403)
      .json({ message: "Sorry, you are not allowed to access this page" });
  }
};

module.exports = isAdmin;
