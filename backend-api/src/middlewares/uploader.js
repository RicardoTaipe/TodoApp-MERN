//setting multer
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (_, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

module.exports = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: extension file must be jpg or png"));
  },
});
