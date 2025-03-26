const express = require("express");
const { login, signup, getUser } = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");

const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post("/signup", upload.single("image"), signup);
userRouter.get("/:username", getUser); 

module.exports = userRouter;
