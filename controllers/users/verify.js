const asyncHandler = require("express-async-handler");
const { UserServices } = require("../../services");
const { HttpError } = require("../../helpers");

const verify = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await UserServices.userForVerify(verificationToken);
  if (!user) {
    throw HttpError(404, "Not found");
  }
  if (user.verify === true) {
    throw HttpError(400, "already verified");
  }
  await UserServices.userEmailVerification(user.id);
  res.status(200).json({ status: 200, message: "Verification successful" });
});

module.exports = verify;
