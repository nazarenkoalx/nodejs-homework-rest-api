const nodemailer = require("nodemailer");

const { SENDER_EMAIL, UKR_NET_API_KEY } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: { user: SENDER_EMAIL, pass: UKR_NET_API_KEY },
};
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: SENDER_EMAIL,
  };
  transport.sendMail(email);
};

module.exports = sendEmail;
