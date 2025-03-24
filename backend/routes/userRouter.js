const express = require("express");
const { login, signup } = require("../controllers/userController");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/signup', uploadMiddleware.single("photo"), signup)

module.exports = userRouter