const express = require("express")
const {authentication} = require('../middleware/authentication')
const {uploadMiddleware} = require('../middleware/uploadMiddleware')

const postRouter = express.Router()
module.exports = postRouter