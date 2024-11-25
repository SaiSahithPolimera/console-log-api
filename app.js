const express = require("express");
const app = express();
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authRouter);
app.use(postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
