const mongoose = require("mongoose");
const { user } = require("../userSignUp/userSignUp.model");
const { token } = require("./auth.model");

const checkEmail = async (email) => {
  const userEmail = await user.findOne({ email: email }).select("+password");
  if (userEmail) return userEmail;
  return false;
};

const createToken = async (Token) => {
  return await token.insertMany(Token);
};

const getToken = async (tokens) => {
  return await token.findOne({ token: tokens });
};

const findUser = async (id) => {
  return await user.findOne({ _id: new mongoose.Types.ObjectId(id) });
};

const deleteToken = async (id) => {
  return await token.deleteMany({ $or: [{ _id: id }, { reference: id }] });
};

const updatePassword = async (email, password) => {
  return await user.findOneAndUpdate(
    { email: email },
    { $set: { password: password } },
    { new: true }
  );
};

module.exports = {
  checkEmail,
  createToken,
  getToken,
  findUser,
  deleteToken,
  updatePassword,
};
