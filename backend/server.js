const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const likesRouter = require("./routes/likesRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/user", userRouter);
app.use("/posts", postRouter);
app.use("/likes", likesRouter);
app.use("/posts/:postId/comments", commentRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
