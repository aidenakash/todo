const jwt = require("jsonwebtoken");
const appError = require("../error/appError");
const services = require("../auth/auth.services");

exports.userAuthVerification = async (req, res, next) => {
  try {
    let Token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      Token = req.headers.authorization.split(" ")[1];
    if (!Token)
      return next(new appError("you must Login Or token required ", 401));

    const checkTokenIsExists = await services.isTokensExist(Token);
    if (!checkTokenIsExists)
      return next(new appError("Token not exists in the db", 404));

    const decodeToken = await services.TokenDecode(Token);
    if (!decodeToken) return next(new appError("token not decoded", 400));
    
    const checkUser = await services.checkUserIsExist(decodeToken);
    if (!checkUser) return next(new appError("not a existing user", 400));

    req.userId = decodeToken;
    console.log(decodeToken);
    
    next();
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};
