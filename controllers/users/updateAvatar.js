const asyncHandler = require("express-async-handler");
const { HttpError } = require("../../helpers");
const { UserServices } = require("../../services");
const { createAvatarPath } = require("../../helpers");

const updateAvatar = asyncHandler(async (req, res) => {
  const { id, email } = req.user;
  if (!req.file) {
    throw HttpError(401);
  }
  const avatarURL = await createAvatarPath(req.file, email);
  const reuslt = await UserServices.updateUserAvatar(id, avatarURL);
  const responseMessage = {
    avatarURL: reuslt.avatarURL,
  };
  res.status(200).json({ status: 200, message: responseMessage });
});

module.exports = updateAvatar;
