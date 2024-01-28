const { default: mongoose } = require("mongoose");
const { task } = require("./todoTask.model");
const { taskItem } = require("../todoTaskItem/todoTaskItem.model");

const saveTask = async (newTask) => {
  return await task.insertMany(newTask);
};

const updateTask = async (taskId, taskUpdate) => {
  return await task.findOneAndUpdate(
    { _id: taskId },
    { $set: taskUpdate },
    { new: true }
  );
};

const updateTaskStatus = async (taskId) => {
  return await task.findOneAndUpdate(
    { _id: taskId },
    { $set: { status: "deActive" } },
    { new: true }
  );
};

const findAllTask = async (userId) => {
  return await task.find({ userId: userId });
};

const findAllTaskCount = async (userId) => {
  //return await task.countDocuments({userId:userId})
  const findAll = await task.find({ userId, status: "Active" });
  return findAll.length;
};

const findTaskById = async (taskId) => {
  return await task.findOne({ _id: new mongoose.Types.ObjectId(taskId) });
};

const findTaskAndItem = async (userId) => {
  const pipeline = [
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "todo task items",
        localField: "_id",
        foreignField: "reference",
        as: "items",
      },
    },
  ];
  return await task.aggregate(pipeline);
};

const findTaskAndItemPagination = async (userId, limit, startIndex) => {
  const pipeline = [
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "todo task items",
        localField: "_id",
        foreignField: "reference",
        as: "items",
      },
    },
  ];
  const response = await task.aggregate(pipeline).skip(startIndex).limit(limit);
  const count = await task.find({userId:userId})
  const result = {};
  result.doc = response;
  result.counts =count.length

  return result;
};

const taskItemById = async (taskId) => {
  const pipeline = [
    { $match: { _id: new mongoose.Types.ObjectId(taskId) } },
    {
      $lookup: {
        from: "todo task items",
        localField: "_id",
        foreignField: "reference",
        as: "items",
      },
    },
  ];
  return await task.aggregate(pipeline);
};

const removeTaskItem = async (taskId) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    // Ensure consistent use of taskId variable
    await task.findOne({ _id: taskId }).session(session);
    await taskItem.findOne({ reference: taskId }).session(session);

    await task.deleteOne({ _id: taskId }).session(session); // Corrected variable name

    await taskItem.deleteMany({ reference: taskId }).session(session);

    await session.commitTransaction();

    session.endSession();

    return "delete";
  } catch (error) {
    await session.abortTransaction();

    await session.endSession(); // Ensure session always ends
  }
};

module.exports = {
  saveTask,
  updateTask,
  updateTaskStatus,
  findAllTask,
  findAllTaskCount,
  findTaskById,
  findTaskAndItem,
  taskItemById,
  removeTaskItem,
  findTaskAndItemPagination,
};
