const asyncHandler = require("express-async-handler");
const { UserServices } = require("../../services");
const { HttpError, sendEmail } = require("../../helpers");
const { emailSchema } = require("../../schemas");

const resendVerifyEmail = asyncHandler(async (req, res) => {
  const { error } = emailSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "missing required field email");
  }
  const user = await UserServices.findUser(email);
  if (user.verify || !user.verificationToken) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<h1>Dear ${email}, you have requested new verification letter. Please follow the link below to verify your email address.</h1> <br><br><br>
    <a target="_blank" href="http://localhost:3000/users/verify/${user.verificationToken}">Verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(200).json({ status: 200, message: "Verification email sent" });
});

module.exports = resendVerifyEmail;
