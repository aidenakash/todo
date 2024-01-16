const express = require("express");
const router = express.Router();
const appError = require("../error/appError");
const globalErrorController = require("../error/errorControl");
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
  inputValidation.inputIdValidation,
  controller.findUserById
);
router.put(
  "/UpdateUserById/:id",
  inputValidation.inputIdValidation,
  inputValidation.updateInputValidation,
  controller.updateUser
);
router.delete(
  "/deleteUserById/:id",
  inputValidation.inputIdValidation,
  controller.deleteUserById
);
router.all("*", (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl} in the server`, 404));
});
router.use(globalErrorController);
module.exports = router;
