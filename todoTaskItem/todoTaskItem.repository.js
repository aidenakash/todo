const { taskItem } = require("./todoTaskItem.model");

const createTaskItem = async (newTaskITem) => {
  return await taskItem.insertMany(newTaskITem);
};

const findAll = async (taskId) => {
  return await taskItem.find({ reference: taskId });
};

const paginate = async(taskId, limit , startIndex)=>{

  const response = await taskItem.find({ reference: taskId })
  .skip(startIndex).limit(limit);
  const count = await taskItem.find({ reference: taskId });
  const result = {};
  result.docs= response;
  result.count   = count.length;
  return result
}

const findById = async (taskItemId) => {
  return await taskItem.findOne({ _id: taskItemId });
};

const updateById = async (taskItemId, update) => {
  return await taskItem.findOneAndUpdate(
    { _id: taskItemId },
    { $set: update },
    { new: true }
  );
};

const updateStatus = async (taskItemId) => {
  return await taskItem.findOneAndUpdate(
    { _id: taskItemId },
    { $set: { isDon: true } },
    { new: true }
  );
};

const removeTaskITem = async(taskItemId)=>{
    return await taskItem.deleteOne({_id:taskItemId})

}
module.exports = {
  createTaskItem,
  findAll,
  findById,
  updateById,
  updateStatus,
  removeTaskITem,
  paginate
};
