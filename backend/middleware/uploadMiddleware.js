// const multer = require('multer');
// const path = require('path')


// const twitStorage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         if(!file) cb (new Error('File not given'), false)
//         cb(null, "uploads")
//     },
//     filename: (req, file, cb) => { cb(null, Date.now() + "_" + file.originalname)}
// })

// const upload = multer({storage: twitStorage})
// module.exports = upload    


const multer = require("multer");
const path = require("path");

// Configure storage for uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure "uploads" folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

// Filter: Allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only images are allowed!"), false);
    }

    cb(null, true);
};

// Upload middleware
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
    fileFilter,
});

module.exports = upload;
