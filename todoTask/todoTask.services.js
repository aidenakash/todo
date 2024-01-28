const repository = require("./todoTask.repository");
const paginate = require("../helpers/helper.pagenation");

const createTodoTask = async (newTask) => {
  const save = repository.saveTask(newTask);
  if (!save) return false;
  return save;
};

const updateTodoTask = async (taskId, taskUpdate) => {
  const update = await repository.updateTask(taskId, taskUpdate);
  if (!update) return false;
  return update;
};

const statusUpdate = async (taskId) => {
  const status = await repository.updateTaskStatus(taskId);
  if (!status) return false;
  return status;
};

const getAllTask = async (userId) => {
  const AllTask = await repository.findAllTask(userId);
  if (!AllTask) return false;
  return AllTask;
};

const getAllCount = async (userId) => {
  const count = await repository.findAllTaskCount(userId);
  console.log(count);
  if (!count) return false;
  return count;
};

const findTaskById = async (taskId) => {
  const findTask = await repository.findTaskById(taskId);
  if (!findTask) return false;
  return findTask;
};

const findAllTaskAndItem = async (userId) => {
  const findTaskItem = await repository.findTaskAndItem(userId);
  if (!findTaskItem) return false;
  return findTaskItem;
};

const findAllTaskAndItemPaginate = async (userId, page, limit) => {
  const findTaskItem = await paginate.taskPagination ( page, limit, userId);
  if (!findTaskItem) return false;
  return findTaskItem;
};

const findTaskAndItemById = async (taskId) => {
  const findTaskItemById = await repository.taskItemById(taskId);
  if (!findTaskItemById) return false;
  return findTaskItemById;
};

const removeTaskAndItem = async (taskId) => {
  const deleteTaskItem = await repository.removeTaskItem(taskId);
  return deleteTaskItem;
};

module.exports = {
  createTodoTask,
  updateTodoTask,
  statusUpdate,
  getAllTask,
  getAllCount,
  findTaskById,
  findAllTaskAndItem,
  findTaskAndItemById,
  removeTaskAndItem,
  findAllTaskAndItemPaginate
};
