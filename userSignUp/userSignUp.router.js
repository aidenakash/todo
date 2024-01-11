const express = require("express");
const router = express.Router();
const appError = require("../error/appError");
const globalErrorController = require("../error/errorControl");
const inputValidation = require("./userSignUp.inputValidation");
const service = require("./userSignUp.services");

router.get("/getAllUser", service.getAllUser);
router.post(
  "/createUser",
  inputValidation.createUserInputValidation,
  service.createUser
);
router.get(
  "/getUserById/:id",
  inputValidation.inputIdValidation,
  service.getUserById
);
router.put(
  "/UpdateUserById/:id",
  inputValidation.inputIdValidation,
  service.updateUser
);
router.delete(
  "/deleteUserById/:id",
  inputValidation.inputIdValidation,
  service.deleteUserById
);
router.all("*", (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl} in the server`, 404));
});
router.use(globalErrorController);
module.exports = router;
