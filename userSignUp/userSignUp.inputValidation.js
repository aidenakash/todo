const joi = require("joi");
const mongoose = require("mongoose");
const appError = require("../error/appError");
const repository = require("./userSignUp.repository")

const inputIdValidation = (req, res, next) => {
  const checkValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!checkValidId)
    return next(new appError("This id is not found & invalid id", 404));
  console.log(req.params.id);
  next();
};

const createUserInputValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi
      .string()
      .required()
      .regex(/^[a-zA-Z ]{3,}$/),
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
  if (input.error) return res.status(400).send(input.error.details[0].message);
  next();
};

module.exports = { inputIdValidation, createUserInputValidation };
