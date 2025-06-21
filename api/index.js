const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("../routes/authRouter");
const postRouter = require("../routes/postRouter");
const tagsRouter = require("../routes/tagsRouter");

const app = express();

app.use(express.json());
app.use(cors({
  origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(authRouter);
app.use(postRouter);
app.use(tagsRouter);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports= app
