const multer = require('multer');
const path = require('path')


// const twitStorage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         if(!file) cb (new Error('File not given'), false)
//         cb(null, "uploads")
//     },
//     filename: (req, file, cb) => { cb(null, Date.now() + "_" + file.originalname)}
// })

// const upload = multer({storage: twitStorage})
const uploadMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
// const uploadMiddleware = upload.
module.exports = uploadMiddleware    
