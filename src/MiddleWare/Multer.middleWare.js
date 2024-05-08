import multer from "multer";
import upload from "../../upload/images"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  path.join(__dirname, '/upload/images'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});

export const upload = multer({
    storage
});

//cb(null, "./upload/images")

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, path.join(__dirname,'../uploads/');
//     },
//     filename: function(req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//     }
//   });