const joi = require("joi");
const mongoose = require("mongoose");
const appError = require("../error/appError");


const inputIdValidation = (req, res, next) => {
  const checkValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!checkValidId)
    return next(new appError("This id is not found & invalid id", 404));
  next();
};

const createUserInputValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    gender: joi.string().required().valid("male", "female", "other"),
    email: joi.string().required(),
    password: joi
      .string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|[-@#$%^&*]).{8,}$/),
    phone: joi.string().required(),
    isDelete: joi.boolean().optional(),
  });
  const input = schema.validate(req.body);
  if (input.error) next(new appError(input.error.message, 404));
  next();
};
const updateInputValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    gender: joi.string().required().valid("male", "female", "other"),
    phone: joi.string().required(),
  });
  const input = schema.validate(req.body);
  if (input.error) next(new appError(input.error.message, 404));;
  next();
};

module.exports = {
  inputIdValidation,
  createUserInputValidation,
  updateInputValidation,
};
