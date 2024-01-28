const joi = require("joi");
const appError = require("../error/appError");

const createTodoTask = (req, res, next) => {
  const schema = joi.object({
    userId: joi.string().optional(),
    task: joi.string().required(),
    description: joi.string().optional(),
  });
  const input = schema.validate(req.body);
  if (input.error) return  next(new appError(input.error.message, 404));
  next();
};

const updateTodoTask = (req, res, next) => {
  const schema = joi.object({
    task: joi.string().optional(),
    description: joi.string().optional(),
  });
  const input = schema.validate(req.body);
  if (input.error) return  next(new appError(input.error.message, 404));
  next();
};

module.exports = { createTodoTask, updateTodoTask}