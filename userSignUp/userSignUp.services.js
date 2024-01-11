const { user } = require("./userSignUp.model");
const repository = require("./userSignUp.repository");
const bcrypt = require("bcrypt");

const getAllUser = async (req, res, next) => {
  try {
    const Users = await repository.findAllUser();
    res.status(200).send(Users);
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const User = await repository.findUserById(id);
    if (User.isDelete === true) {
      res.status(404).send("Data Not Found");
    } else {
      res.status(200).send(User);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};

const createUser = async (req, res, next) => {
  try {
    const checkEmailIsExisting = await repository.checkEmail(req.body.email);
    if (checkEmailIsExisting)
      return res
        .status(400)
        .send(`this email ${req.body.email} already existing`);
    const password = req.body.password;
    const hashing = await bcrypt.hash(password, 12);

    const newUser = new user({
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      password: hashing,
      phone: req.body.phone,
    });

    const saveUser = await repository.createUser(newUser);
    console.log(saveUser);
    if (saveUser) {
      console.log("user Saved successfully");
      return res.status(201).send(saveUser);
    } else {
      console.log("user not Saved");
      return res.status(400).send("error to saving user");
    }
  } catch (error) {
    console.log("error");
    return res.status(500).send(error);
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const User = await repository.findUserById(id);
    if (User.isDelete === false) {
      const update = {
        name: req.body.name,
        gender: req.body.gender,
        phone: req.body.phone,
      };
      await repository.updateUser(id, update);
      const User = await repository.findUserById(id);
      return res.status(200).send(User);
    }
    res.status(500).send(" data not found");
  } catch (error) {
    console.log("error");
    return res.status(500).send(error);
  }
};

const deleteUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    //const User = await repository.findUserById(id);
    //if(User){
    await repository.deleteUser(id);
    res.status(200).send("DELETED");
    // }
  } catch (error) {
    console.log("error");
    return res.status(500).send(error);
  }
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
};
