const User = require("../models/user");
const config = require("../config/configuration");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

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

const logIn = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw createError(401, "No user found");
  }
  const match = await user.matchPassword(password);
  if (!match) {
    throw createError(403, "Login failed");
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: 86400 }
  );
  return { uid: user._id, token };
};

module.exports = { signUp, logIn };
