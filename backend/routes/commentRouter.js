// const express = require("express");
// const { getComments, createComment } = require("../controllers/commentController");
// const { authentication } = require("../middleware/authentication");


// const commentRouter = express.Router({ mergeParams: true }); // ✅ important

// commentRouter.get("/", getComments);
// commentRouter.post("/", authentication, createComment);

// module.exports = commentRouter;

// commentRouter

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

// Like/Unlike comment
commentRouter.post("/:commentId/like", authentication, likeComment);
commentRouter.delete("/:commentId/unlike", authentication, unlikeComment);
commentRouter.get("/:commentId/likes-count", getCommentLikes);

module.exports = commentRouter;
