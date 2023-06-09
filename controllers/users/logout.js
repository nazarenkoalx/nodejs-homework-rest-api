const asyncHandler = require("express-async-handler");
const { UserServices } = require("../../services");
const { HttpError } = require("../../helpers");

const logout = asyncHandler(async (req, res) => {
  const { id } = req.user;
  if (!id) {
    throw HttpError(401);
  }
  await UserServices.logout(id);
  res.status(204).json({ status: 204, message: "logout success" });
});

module.exports = logout;
