const express = require("express");
const router = express.Router();
const appError = require("../error/appError");
const controller = require("./todoTask.controller");
const inputValidation = require("./todoTask.input.validation");
const authChecking = require("../middleWare/auth.middleware");

router.get(
  "/getAllTask/:userId",
  authChecking.userAuthVerification,
  controller.getAllTask
);
router.get(
  "/getAllTaskCount/:userId",
  authChecking.userAuthVerification,
  controller.getAllTaskCount
);
router.get(
  "/getAllTaskAndItem/:userId",
  authChecking.userAuthVerification,
  controller.getAllTaskAndItem
);
router.get(
  "/getTaskAndItemById/:taskId",
  authChecking.userAuthVerification,
  controller.getTaskAndItemById
);
router.get(
  "/getTaskById/:id",
  authChecking.userAuthVerification,
  controller.getTaskById
);
router.post(
  "/createTask",
  authChecking.userAuthVerification,
  inputValidation.createTodoTask,
  controller.createTask
);
router.put(
  "/updateTaskById/:id",
  authChecking.userAuthVerification,
  inputValidation.updateTodoTask,
  controller.updateTaskById
);
router.put(
  "/updateTaskStatusById/:id",
  authChecking.userAuthVerification,
  controller.updateTaskStatusById
);
router.delete(
  "/deleteTaskAndItemById/:taskId",
  authChecking.userAuthVerification,
  controller.deleteTaskAndTaskItemById
);
router.all("*", (req, res, next) =>
  next(new appError(`can't find ${req.originalUrl} in the server`, 400))
);
module.exports = router;
