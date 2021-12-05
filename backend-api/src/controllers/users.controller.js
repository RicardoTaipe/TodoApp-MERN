const User = require("../models/user");
const config = require("../config/configuration");
const createError = require("http-errors");

const signUp = async (body) => {
  const { email, password, name, username } = body;
  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    throw createError(400, "The email is already in use");
  }
  const newUser = new User({ email, password, name, username });
  newUser.password = await newUser.encryptPassword(password);
  return await newUser.save();
};

module.exports = { signUp };
