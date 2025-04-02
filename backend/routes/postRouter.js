const express = require("express");
// const { authentication } = require('../middleware/authentication');
const upload = require('../middleware/uploadMiddleware');
const { allPosts, myPosts, deletePosts, postPosts } = require("../controllers/postController");


const postRouter = express.Router();

postRouter.get("/", allPosts);
postRouter.get("/:id", myPosts);
postRouter.post("/", upload.single("post_img"), postPosts);
postRouter.delete("/:id", deletePosts);

module.exports = postRouter;
