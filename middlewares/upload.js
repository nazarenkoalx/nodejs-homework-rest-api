const multer = require("multer");
const path = require("path");
const { HttpError } = require("../helpers");

const destination = path.resolve("temp");
const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newName = `${uniquePrefix}_${file.originalname}`;
    cb(null, newName);
  },
});

const limits = {
  fileSize: 1024 * 1024,
};
const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  const [type] = mimetype.split("/");
  if (type !== "image") {
    cb(HttpError(400, "File can have only .jpg or .png extension"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
