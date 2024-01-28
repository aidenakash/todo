const taskRepository = require("../todoTask/todoTask.repository");
const taskItemRepository = require("../todoTaskItem/todoTaskItem.repository");

const checkItsSameUserInTask = async (id, userId) => {
  const check = await taskRepository.findTaskById(id);
  if (!check) return false;
  if (userId == check.userId) return true;
  return false;
};

const checkItsSameUserInTaskItem = async (id, userId) => {
  const check = await taskItemRepository.findById(id);
  if (!check) return false;
  if (userId == check.refUserId) return check;
  return false;
};

module.exports = { checkItsSameUserInTask, checkItsSameUserInTaskItem };
