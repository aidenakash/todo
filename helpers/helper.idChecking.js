const mongoose = require("mongoose");
const appError = require("../error/appError");

const inputIdValidation = (req, res, next) => {
    const checkValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!checkValidId)
      return next(new appError("This id is not found & invalid id", 404));
    next();
  };

  module.exports = {inputIdValidation}
