// backend/routes/likesRouter.js

const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

router.post("/:postId", likeController.toggleLike);

module.exports = router;
