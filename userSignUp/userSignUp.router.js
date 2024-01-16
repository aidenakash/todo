const express = require("express");
const router = express.Router();
const appError = require("../error/appError");
const idValidation =require("../helpers/helper.idChecking")
const inputValidation = require("./userSignUp.inputValidation");
const controller = require("./userSignUp.controller");

router.get("/getAllUser", controller.findAllUser);
router.post(
  "/createUser",
  inputValidation.createUserInputValidation,
  controller.createUser
);
router.get(
  "/getUserById/:id",
  idValidation.inputIdValidation,
  controller.findUserById
);
router.put(
  "/UpdateUserById/:id",
  idValidation.inputIdValidation,
  inputValidation.updateInputValidation,
  controller.updateUser
);
router.delete(
  "/deleteUserById/:id",
  idValidation.inputIdValidation,
  controller.deleteUserById
);
router.all("*", (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl} in the server`, 404));
});

module.exports = router;
