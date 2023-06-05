const multer = require("multer");
const path = require("path");
// const { HttpError } = require("../helpers");

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

// const fileFilter = (req, file, cb) => {
//   const { mimetype } = file;
//   console.log(mimetype);
//   const proverka = mimetype === "image/jpeg" ? 1 : 0;
//   console.log(proverka);
//   if (
//     mimetype === "image/jpeg" ||
//     mimetype === "image/png" ||
//     mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   }

//   cb(HttpError(400, "File can have only .jpeg, .jpg or .png extension"), false);
// };

const upload = multer({ storage, limits });

module.exports = upload;
