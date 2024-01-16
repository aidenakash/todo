const appError = require("../error/appError");
const services = require("./userSignUp.services");
const bcrypt = require("bcrypt");

const findAllUser = async (req, res, next) => {
  try {
    const getAllUsers = await services.getAllUser();
    if (getAllUsers) {
      return res.status(200).send(getAllUsers);
    } else {
      return res.status(404).send("No users found");
    }
  } catch (error) {
    next(new appError(error.message, 500));
  }
};

const findUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userById = await services.getUserById(id);
    if (userById) {
      return res.status(200).send(userById);
    } else {
      return res.status(404).send("No users found");
    }
  } catch (error) {
    next(new appError(error.message, 500));
  }
};

const createUser = async (req, res, next) => {
  try {
    const checkEmailIsExisting = await services.checkEmail(req.body.email);
    if (checkEmailIsExisting)
      return res
        .status(400)
        .send(`this email ${req.body.email} already existing`);
    const password = req.body.password;
    const hashing = await bcrypt.hash(password, 12);

    const newUser = {
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      password: hashing,
      phone: req.body.phone,
    };
    const createUser = await services.createUser(newUser);
    if (createUser) {
      console.log("user Saved successfully");
      return res.status(201).send(createUser);
    } else {
      console.log("user not Saved");
      return res.status(400).send("User not saved");
    }
  } catch (error) {
    next(new appError(error.message, 500));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findUser = await services.getUserById(id);

    if (findUser.isDelete === false) {
      const update = {
        name: req.body.name,
        gender: req.body.gender,
        phone: req.body.phone,
      };
      const updatedUser = await services.updateUser(id, update);

      return res.status(202).send(updatedUser);
    } else return res.status(400).send("not update");
  } catch (error) {
    next(new appError(error.message, 500));
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findUser = await services.getUserById(id);
    if (findUser) {
      await services.deleteUserById(id);
      return res.status(200).send("USER DELETED ");
    } else {
      return res.status(400).send("NOT DELETED");
    }
  } catch (error) {
    next(new appError(error.message, 500));
  }
};
module.exports = {
  findAllUser,
  findUserById,
  createUser,
  updateUser,
  deleteUserById,
};
