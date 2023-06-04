const gravatar = require("gravatar");

function createAvatarURL(email) {
  const avatarURL = gravatar.url(
    email,
    { s: "100", r: "x", d: "retro" },
    false
  );
  return avatarURL;
}

module.exports = createAvatarURL;
