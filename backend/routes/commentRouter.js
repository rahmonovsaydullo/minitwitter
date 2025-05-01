const express = require("express");
const { getComments, createComment } = require("../controllers/commentController");
const { authentication } = require("../middleware/authentication");


const commentRouter = express.Router({ mergeParams: true }); // ✅ important

commentRouter.get("/", getComments);
commentRouter.post("/", authentication, createComment);

module.exports = commentRouter;

commentRouter