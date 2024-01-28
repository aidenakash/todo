const services = require("./todoTask.services");
const appError = require("../error/appError");


const getAllTask =async (req, res, next) => {
try {
    const userId = req.userId;
    if(!userId)return next(new appError("userId is must",400))

    const getAllTask = await services .getAllTask(userId);
    if(!getAllTask)return next (new appError("not find the all task",400));

    return res.status(200).send(getAllTask)
    
} catch (error) {
    return next(new appError(error.message,500))
}};


const getAllTaskCount = async(req, res, next) => {
try {
    const userId = req.userId;
    if(!userId)return next(new appError("userId is must",400))

    const getAllTaskCount = await services.getAllCount(userId);
    console.log(getAllTaskCount)
    //if(!getAllTaskCount)return next(new appError("not find the  task count",400))

    return res.status(200).send({count:getAllTaskCount});
    
} catch (error) {
    return next(new appError(error.message,500))
}};


const getAllTaskAndItem = async(req, res, next) => {
try {
  const userId = req.userId;
  const pageNumber =parseInt(req.query.page);
  const  pageSize = parseInt(req.query.limit);
    if(!userId ||!pageNumber||!pageSize)return next(new appError("userId, page,limit is must",400))

    const findAllTaskAndItem = await services.findAllTaskAndItemPaginate(userId, pageNumber,pageSize)
    if(!findAllTaskAndItem)return next(new appError("not finding task and item",400))

    return res.status(200).send(findAllTaskAndItem)
} catch (error) {
    return next(new appError(error.message,500))
}};


const getTaskAndItemById = async (req, res, next) => {
try {
  const taskId = req.params.taskId;
  if(!taskId)return next(new appError("Task id  is must",400))

  const findTaskItemById = await services.findTaskAndItemById(taskId);
  if(!findTaskItemById)return next(new appError("not find Task and item using the id",400))

  return res.status(200).send(findTaskItemById)
} catch (error) {
    return next(new appError(error.message,500)) 
}};


const getTaskById = async(req, res, next) => {
try {
  const taskId =  req.params.id;
  if(!taskId)return next(new appError("task id is required",400));

  const findTaskById = await services.findTaskById(taskId);
  if(!findTaskById) return next(new appError("not find the task",400));
  console.log("enter")
  return res.status(200).send(findTaskById);
    
} catch (error) {
    return next(new appError(error.message,500))
}};


const createTask = async(req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) return next(new appError("user id is must ", 404));

    const newTask = {
      userId: userId,
      task: req.body.task,
      description: req.body.description,
    };

    const createTodoTask = await services.createTodoTask(newTask);
    if (!createTodoTask) return next(new appError("Task not Saved", 400));

    return res.status(201).send(createTodoTask);
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};


const updateTaskById = async (req, res, next) => {
  try {
    const TaskId = req.params.id;
    if (!TaskId) return next(new appError("Task id is must", 400));
    const update = {
      task: req.body.task,
      description: req.body.description,
    };
    const updateTask = await services.updateTodoTask(TaskId, update);
    if(!updateTask)return next (new appError("task not update", 400))

    return res.status(201).send(updateTask)
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};


const updateTaskStatusById =async (req, res, next) => {
try {
    const taskId  = req.params.id;
    if(!taskId)return next (new appError("task id is must ",400));

    const updateStatus = await services.statusUpdate(taskId);
    if(!updateStatus)return next(new appError("not update the status", 400));

    return res.status(201).send(updateStatus.status)
    
} catch (error) {
    return next(new appError(error.message,500))
}};


const deleteTaskAndTaskItemById = async (req, res, next) => {
try {
  const taskId = req.params.taskId;
  if(!taskId)return next(new appError("Task id  is must",400))

  const deleteTaskItem = await services.removeTaskAndItem(taskId);
  console.log(deleteTaskItem)
  if(!deleteTaskItem)return next(new appError("isn't delete",400));

  return res.status(200).send("deleted")
    
} catch (error) {
    return next(new appError(error.message,500))
}};

module.exports = {
  getAllTask,
  getAllTaskAndItem,
  getAllTaskCount,
  getTaskAndItemById,
  getTaskById,
  createTask,
  updateTaskById,
  updateTaskStatusById,
  deleteTaskAndTaskItemById,
};
