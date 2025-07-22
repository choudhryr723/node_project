import multer from 'multer';

//Middleware for handling multipart/form-data, which is used for uploading files
// This middleware will store the uploaded files in the ./public/temp director
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname.originalname)
    }
})

const upload = multer({
    storage,
})
