const joi = require("joi");
const appError = require("../error/appError")

const userLogin = (req,res,next) => {
    const schema = joi.object({
        email:joi.string().email().required(),
        password: joi.string().min(8).max(20).required(),
    })
    const input =schema.validate(req.body);
    if(input.error)return  next(new appError(input.error.message, 400))
next();
};

const forgotPassword = (req,res,next) => {
    const schema = joi.object({
        email:joi.string().email().required(), 
    });
    const input =schema.validate(req.body);
    if(input.error)return  next(new appError(input.error.message, 400))
next();
};

const userResetPassword = (req,res,next) => {
    const schema = joi.object({
        newPassword:joi.string().min(8).max(20).required(),
    });
    const input =schema.validate(req.body);
    if(input.error)return  next(new appError(input.error.message, 400))
next();
};

const userChangePassword = (req,res,next) => {
    const schema = joi.object({
        email:joi.string().email().required(),
        oldPassword: joi.string().min(8).max(20).required(),
        newPassword :joi.string().min(8).max(20).required(),
    });
    const input = schema.validate(req.body);
    if(input.error)return  next(new appError(input.error.message, 400))
next();

};



module.exports = {
  userLogin,
  forgotPassword,
  userResetPassword,
  userChangePassword,
};
