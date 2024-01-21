const express = require("express");
const router = express.Router();
const appError = require("../error/appError");
const controller = require("./auth.controller");
const inputValidation = require("./auth.inputValidation");

router.post("/logIn", inputValidation.userLogin, controller.login);
router.delete("/logOut", controller.logout);
router.post("/refresh", controller.tokenRefresh);
router.post(
  "/forgotPassword",
  inputValidation.forgotPassword,
  controller.forgotPassword
);
router.patch(
  "/changePassword",
  inputValidation.userChangePassword,
  controller.changePassword
);
router.patch(
  "/resetPassword",
  inputValidation.userResetPassword,
  controller.resetPassword
);

router.all(new appError("this is not a url", 404));
module.exports = router;
