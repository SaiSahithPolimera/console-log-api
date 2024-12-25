const jwt = require("jsonwebtoken");
const db = require("../../db/queries");

const isAdmin = async (req, res, next) => {
  try {
    const bearer = req.rawHeaders.filter((header) => header.includes('token'))[0];
    const token = (bearer.split(" ").filter((cookie) => cookie.includes("token"))[0]).split("=")[1];
    if (!bearer) return res.status(401).json({ message: "No token provided" });
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
