const { user } = require("./userSignUp.model");
const repository = require("./userSignUp.repository");

const getAllUser = async () => {
  return await repository.findAllUser();
};

const getUserById = async (id) => {
  return await repository.findUserById(id);
};

const createUser = async (newUser) => {
  return await repository.createUser(newUser);
};

const updateUser = async (id, update) => {
  return await repository.updateUser(id, update);
};

const deleteUserById = async (id) => {
  return await repository.deleteUser(id);
};

const checkEmail = async (email) => {
  return await repository.checkEmail(email);
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  checkEmail,
};
