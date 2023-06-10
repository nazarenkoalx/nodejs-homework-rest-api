const asyncHandler = require("express-async-handler");
const { HttpError, sendEmail } = require("../../helpers");
const { userSchema } = require("../../schemas");
const { UserServices } = require("../../services");
const { nanoid } = require("nanoid");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = asyncHandler(async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { email, password: pass } = req.body;
  const userCheck = await UserServices.findUser(email);
  if (userCheck !== null) {
    throw HttpError(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(pass, saltRounds);
  const verificationToken = nanoid();
  const result = await UserServices.register(
    email,
    hashedPassword,
    verificationToken
  );

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<h1>Dear ${email}, please follow the link below to verify your email address.</h1> <br><br><br>
    <a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Verify email</a>`,
  };

  await sendEmail(verifyEmail);

  const resMesage = {
    user: {
      email: result.email,
      subcription: result.subscription,
    },
  };
  res.status(201).json({ status: 201, message: "Success", data: resMesage });
});

module.exports = register;
