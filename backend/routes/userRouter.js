const express = require("express");
const { login, signup } = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");
const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post("/signup", upload.single("image"), signup);

module.exports = userRouter