const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarPath = path.resolve("public", "avatars");

const optimiseAvatar = (path) => {
  Jimp.read(path)
    .then((image) => {
      return image.resize(250, 250).write(path);
    })
    .catch((err) => {
      console.error(err);
    });
};

const createAvatarPath = async (file, useremail) => {
  const { path: tempPath, filename, mimetype } = file;
  const [, extension] = mimetype.split("/");
  const [timestamp] = filename.split("_");
  const [user] = useremail.split("@");
  const newAvatarFilename = `${user}_${timestamp}.${extension}`;
  const newPath = path.join(avatarPath, newAvatarFilename);
  await fs.rename(tempPath, newPath);
  const avatarURL = path.join("avatars", newAvatarFilename);
  optimiseAvatar(newPath);
  return avatarURL;
};

module.exports = createAvatarPath;
