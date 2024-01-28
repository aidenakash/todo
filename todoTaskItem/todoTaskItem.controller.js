const services = require("./todoTaskItem.services");
const appError = require("../error/appError");
const userCheckMiddleWare = require("../middleWare/userCheck.middleware");
const { updateStatus } = require("./todoTaskItem.repository");


const createTaskItem = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.userId;

    if (!taskId || !userId)
      return next(new appError("task Id and user id is required", 400));

    const userChecking = await userCheckMiddleWare.checkItsSameUserInTask(
      taskId,
      userId
    );
    if (userChecking === false)
      return next(new appError("not a same user", 400));
    const newTaskItem = {
      taskItem: req.body.taskItem,
      dueDate: req.body.dueDate,
      reference: taskId,
      refUserId: userId,
    };

    const createNewTaskItem = await services.createTaskItem(newTaskItem);
    if (!createNewTaskItem)
      return next(new appError("not create task item", 400));

    return res.status(201).send(createNewTaskItem);
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

const getAllTaskItemByTaskId = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.userId;
    const pageNumber =parseInt(req.query.page);
    const  pageSize = parseInt(req.query.limit);
    
    if (!taskId || !userId || !pageNumber || !pageSize)
      return next(new appError("task Id and user id ,page,limit is required", 400));

    const userChecking = await userCheckMiddleWare.checkItsSameUserInTask(
      taskId,
      userId
    );
    if (userChecking === false)
      return next(new appError("not a same user", 400));
    

    const findAllTaskItem = await services.paginationTaskItem(pageNumber, pageSize,taskId)
    if (!findAllTaskItem)
      return next(new appError("not find all the task", 400));

    return res.status(200).send(findAllTaskItem);
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

const getAllTaskItemCount = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.userId;
    if (!taskId) return next(new appError("taskId is must", 400));

    const userChecking = await userCheckMiddleWare.checkItsSameUserInTask(
      taskId,
      userId
    );
    if (userChecking === false)
      return next(new appError("not a same user", 400));

    const getAllItemCount = await services.findAllItem(taskId);

    if (!getAllItemCount) return next(new appError("not find the count", 400));
    return res.status(200).send({ count: getAllItemCount.length });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

const getTaskItemById = async (req, res, next) => {
  try {
    const taskItemId = req.params.taskItemId;
    const userId = req.userId;
    if (!taskItemId) return next(new appError("taskId is must", 400));

    const userChecking = await userCheckMiddleWare.checkItsSameUserInTaskItem(
      taskItemId,
      userId
    );

    if (userChecking === false)
      return next(new appError("not a same user", 400));

    return res.status(200).send(userChecking);
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

const updateTaskItemById = async (req, res, next) => {
  try {
    const taskItemId = req.params.taskItemId;
    const userId = req.userId;
    if (!taskItemId) return next(new appError("taskId is must", 400));

    const userChecking = await userCheckMiddleWare.checkItsSameUserInTaskItem(
      taskItemId,
      userId
    );

    if (userChecking === false)
      return next(new appError("not a same user", 400));

    const update = {
      taskItem: req.body.taskItem,
      dueDate: req.body.dueDate,
    };

    const updateTaskItem = await services.updateTaskItem(taskItemId, update);

    if (!updateTaskItem)
      return next(new appError("not update the taskItem", 400));

    return res.status(201).send(updateTaskItem);
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

const updateTaskItemStatusById = async (req, res, next) => {
  try {
    const taskItemId = req.params.taskItemId;
    const userId = req.userId;
    if (!taskItemId) return next(new appError("taskId is must", 400));

    const userChecking = await userCheckMiddleWare.checkItsSameUserInTaskItem(
      taskItemId,
      userId
    );

    if (userChecking === false)
      return next(new appError("not a same user", 400));

    const UpdateStatus = await services.updateTaskItemStatus(taskItemId);
    if (!UpdateStatus) return next(new appError("not update the status", 400));

    return res.status(200).send(UpdateStatus.isDon);
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

const deleteTaskItemById = async (req, res, next) => {
  try {
    const taskItemId = req.params.taskItemId;
    const userId = req.userId;
    if (!taskItemId) return next(new appError("taskId is must", 400));

    const userChecking = await userCheckMiddleWare.checkItsSameUserInTaskItem(
      taskItemId,
      userId
    );

    if (userChecking === false)
      return next(new appError("not a same user", 400));

    const deleteTaskItem = await services.deleteTaskItem(taskItemId);
    if (!deleteTaskItem)
      return next(new appError("not delete the task item", 400));
    return res.status(200).send("Delete");
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};
module.exports = {
  createTaskItem,
  getAllTaskItemByTaskId,
  getAllTaskItemCount,
  getTaskItemById,
  updateTaskItemById,
  updateTaskItemStatusById,
  deleteTaskItemById,
};
