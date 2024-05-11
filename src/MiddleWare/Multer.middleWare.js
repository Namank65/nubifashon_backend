import multer from "multer";
// import upload from "../../upload/images"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  cb(null, "./upload/images"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});

export const upload = multer({
    storage
});
