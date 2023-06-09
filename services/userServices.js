const { User } = require("../models");
const { createAvatarURL } = require("../helpers");

class UserServices {
  async register(email, password) {
    const avatarURL = createAvatarURL(email);
    const result = await User.create({ email, password, avatarURL });
    if (!result) {
      return null;
    }

    return result;
  }

  async login(email) {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    return user;
  }

  async findUser(email) {
    const userCheck = await User.findOne({ email });
    return userCheck;
  }

  async findUserById(id) {
    const user = await User.findById(id);
    return user;
  }

  async updateUserToken(id, token) {
    await User.findByIdAndUpdate(id, { token });
  }

  async logout(id) {
    await User.findByIdAndUpdate(id, { token: "" });
  }

  async updateSubscriptionPlan(id, subscription) {
    const user = await User.findByIdAndUpdate(id, { subscription });
    return user;
  }

  async updateUserAvatar(id, avatarURL) {
    const user = await User.findByIdAndUpdate(id, { avatarURL });
    return user;
  }
}

module.exports = new UserServices();
