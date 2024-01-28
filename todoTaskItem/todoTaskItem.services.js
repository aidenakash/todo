const repository = require("./todoTaskItem.repository");
const pagination = require("../helpers/helper.pagenation");

const createTaskItem = async (newTaskItem) => {
  const create = await repository.createTaskItem(newTaskItem);
  if (!create) return false;
  return create;
};

const findAllItem = async (taskId) => {
  const findAll = await repository.findAll(taskId);
  
  if (!findAll) return false;
  return findAll;
};

const paginationTaskItem = async (page,limit,taskId) =>{
  const paginateTaskItem = await pagination.taskItemPagination(page,limit, taskId);
  if (!paginateTaskItem) return false;
  return paginateTaskItem;
}

const updateTaskItem = async (taskId, update) => {
  const updates = await repository.updateById(taskId, update);
  if (!updates) return false;
  return updates;
};

const updateTaskItemStatus = async (taskId) => {
  const updates = await repository.updateStatus(taskId);
  if (!updates) return false;
  return updates;
};

const deleteTaskItem = async (taskItemId) => {
    const remove = await repository.removeTaskITem(taskItemId);
  if (!remove) return false;
  return remove;
};

module.exports = {
  createTaskItem,
  findAllItem,
  updateTaskItem,
  updateTaskItemStatus,
  deleteTaskItem,
  paginationTaskItem
};
