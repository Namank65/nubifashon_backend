import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/images")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});

//i found my mistake, i have to add .gitkeep file in my .upload/images file because its not there in my gitHub
// will fix this bug tomorrow 
export const upload = multer({
    storage
});
