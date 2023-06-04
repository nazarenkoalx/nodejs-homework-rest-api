const multer = require("multer");
const path = require("path");

const destination = path.resolve("temp");
const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newName = `${file.fieldname}_${uniqueSuffix}`;
    cb(null, newName);
  },
});

const limits = {
  fileSise: 1024 * 1024,
};

const fileFilter = (req, file, cb) => {};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
