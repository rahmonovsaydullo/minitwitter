// const express = require("express");
// const { toggleLike, getUserLikes } = require("../controllers/likeController");
// const { authentication } = require("../middleware/authentication");
// const likeRouter = express.Router();

// // Route to get likes for a specific user
// likeRouter.get('/user/likes', authentication, getUserLikes);  // Fetch likes for the user

// // Route to toggle like for a post (like/unlike)
// likeRouter.post('/likes/:postId', authentication, toggleLike);  // Like or unlike a post

// module.exports = likeRouter;



// backend/routes/likesRouter.js
const express = require('express');
const { toggleLike } = require('../controllers/likeController');
const { authentication } = require('../middleware/authentication');
const likeRouter = express.Router();

// Define the route that listens for POST requests on /likes/:postId
likeRouter.post('/:postId', authentication, toggleLike);

module.exports = likeRouter;
