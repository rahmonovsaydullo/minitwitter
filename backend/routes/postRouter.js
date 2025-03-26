const express = require("express");
const { authentication } = require('../middleware/authentication');
const upload = require('../middleware/uploadMiddleware');
const { allPosts, myPosts, deletePosts, postPosts } = require("../controllers/postController");


const postRouter = express.Router();

postRouter.get("/", authentication, allPosts);
postRouter.get("/:id", authentication, myPosts);
postRouter.post("/", authentication, upload.single("post_img"), postPosts);
postRouter.delete("/:id", authentication, deletePosts);

module.exports = postRouter;
