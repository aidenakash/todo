const express = require("express");
const router = express.Router();
const appError = require("../error/appError");
const inputValidation = require("./todoTaskItem.inputValidation");
const controller = require("./todoTaskItem.controller");
const authChecking = require("../middleWare/auth.middleware");

router.get(
  "/getAllTaskItemByTaskId/:taskId",
  authChecking.userAuthVerification,
  controller.getAllTaskItemByTaskId
);
router.get(
  "/getAllTaskItemCount/:taskId",
  authChecking.userAuthVerification,
  controller.getAllTaskItemCount
);
router.get(
  "/getTaskItemById/:taskItemId",
  authChecking.userAuthVerification,
  controller.getTaskItemById
);
router.post(
  "/createTaskITem/:taskId",
  authChecking.userAuthVerification,
  inputValidation.createTaskItemInputValidation,
  controller.createTaskItem
);
router.put(
  "/updateTaskItemById/:taskItemId",
  inputValidation.updateTaskItemInputValidation,
  authChecking.userAuthVerification,
  controller.updateTaskItemById
);
router.put(
  "/updateTaskItemStatus/:taskItemId",
  authChecking.userAuthVerification,
  controller.updateTaskItemStatusById
);
router.delete(
  "/deleteTaskItemById/:taskItemId",
  authChecking.userAuthVerification,
  controller.deleteTaskItemById
);

router.all("*", (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl} in the server`, 400));
});

module.exports = router;
