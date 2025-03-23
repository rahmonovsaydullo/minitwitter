const express = require("express")
const { authentication } = require('../middleware/authentication')
const { uploadMiddleware } = require('../middleware/uploadMiddleware')
const { allPosts, myPosts, deletePosts, postPosts } = require("../controllers/postController")
const postRouter = express.Router()


postRouter.get("/", authentication, allPosts)
postRouter.get("/:id", authentication, myPosts)
postRouter.post("/", authentication, uploadMiddleware, postPosts)
postRouter.delete("/:id", authentication, deletePosts)

module.exports = postRouter