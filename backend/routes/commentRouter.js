const express = require("express");
const {
  getComments,
  createComment,
  likeComment,
  unlikeComment,
  getCommentLikes,
} = require("../controllers/commentController");
const { authentication } = require("../middleware/authentication");

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get("/", getComments);
commentRouter.post("/", authentication, createComment);


commentRouter.post("/:commentId/like", authentication, likeComment);
commentRouter.delete("/:commentId/unlike", authentication, unlikeComment);
commentRouter.get("/:commentId/likes-count", getCommentLikes);

module.exports = commentRouter;
