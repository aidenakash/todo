const joi = require("joi");
const appError = require("../error/appError");

const createTaskItemInputValidation = (req, res, next) => {
  const schema = joi.object({
    taskItem: joi.string().required(),
    dueDate: joi.date().optional(),
    status: joi.string().optional(),
  });
  const input = schema.validate(req.body);
  if (input.error) return next(new appError(input.error.message, 404));
  next();
};

const updateTaskItemInputValidation = (req, res, next) => {
  const schema = joi.object({
    taskItem: joi.string().required(),
    dueDate: joi.date().optional(),
  });
  const input = schema.validate(req.body);
  if (input.error) return next(new appError(input.error.message, 404));
  next();
};

module.exports = {
  createTaskItemInputValidation,
  updateTaskItemInputValidation,
};
