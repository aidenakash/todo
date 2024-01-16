const { user } = require("./userSignUp.model");
const mongoose = require("mongoose");

const findAllUser = async () => {
  return await user.find({ $and: [{ isDelete: false }] });
};

const findUserById = async (id) => {
  return await user.findOne({ _id: new mongoose.Types.ObjectId(id) });
};

const createUser = async (newUser) => {
  return await user.insertMany(newUser);
};

const checkEmail = async (email) => {
  const UserEmail = await user.findOne({ email: email });
  if (UserEmail) return true;
  return false;
};

const updateUser = async (id, update) => {
  return await user.findOneAndUpdate(
    { _id: id },
    { $set: update },
    { new: true }
  );
};

const deleteUser = async (id) => {
  return await user.findOneAndUpdate({ _id: id }, { isDelete: true });
};
module.exports = {
  createUser,
  findAllUser,
  findUserById,
  updateUser,
  checkEmail,
  deleteUser,
};
