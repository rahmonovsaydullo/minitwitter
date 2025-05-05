const express = require("express");
const { toggleLike, getUserLikes } = require("../controllers/likeController");
const { authentication } = require("../middleware/authentication");

const likeRouter = express.Router();

likeRouter.get("/user/likes", authentication, getUserLikes);
likeRouter.post("/:postId", authentication, toggleLike);

module.exports = likeRouter;
