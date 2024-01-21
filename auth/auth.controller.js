const services = require("./auth.services");
const appError = require("../error/appError");
const createId = require("../helpers/helper.idGenerator");
const jwt = require("../helpers/helper.tokenGenerator");

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //check email and password
    const checkUserIsExist = await services.findUser(email, password);
    if (!checkUserIsExist)
     return next(new appError("wrong email or user not found", 404));
    //id generation
    const accessId = createId.accessId();
    const refreshId = createId.refreshId();
    // token generation
    const accessToken = jwt.createNewAccessToken(
      checkUserIsExist._id,
      "accessToken"
    );
    const refreshToken = jwt.createNewRefreshToken(
      checkUserIsExist._id,
      "refreshToken"
    );
    if (!accessToken || !refreshToken) {
      return next(new appError("something wrong in token generation", 400));
    }
    //token saving
    const newAccessToken = {
      _id: accessId,
      reference: refreshId,
      token: accessToken,
      type: "accessToken",
    };
    const saveAccessToken = await services.saveTokenToDB(newAccessToken);

    const newRefreshToken = {
      _id: refreshId,
      reference: accessId,
      token: refreshToken,
      type: "refreshToken",
    };
    const saveRefreshToken = await services.saveTokenToDB(newRefreshToken);

    if (!saveAccessToken || !saveRefreshToken) {
      return next(new appError("something wrong token saving ", 400));
    }
    return res
      .status(200)
      .setHeader("access", accessToken)
      .setHeader("refresh", refreshToken)
      .json({
        message: "login successfully",
        accessToken,
        refreshToken,
      });
  } catch (error) {
   return next(new appError(error.message, 500));
  }
};

const tokenRefresh = async (req, res, next) => {
  try {
    const RefreshToken = req.headers.refresh;
    if (!RefreshToken)
      return next(new appError("refresh token is required", 400));
    // refresh token checking
    const checkRefreshTokenIsExist = await services.isTokensExist(RefreshToken);
    const referenceTokenDetails = checkRefreshTokenIsExist.id;

    if (!checkRefreshTokenIsExist)
      return next(new appError("refresh token not found", 404));

    //refresh token decoded
    const decodeRefreshToken = await services.TokenDecode(
      checkRefreshTokenIsExist.token
    );
    if (!decodeRefreshToken)
      return next(new appError("refresh token not decoded", 401));

    // find User
    const User = await services.checkUserIsExist(decodeRefreshToken);
    if (!User) return next(new appError("not a user", 404));

    // delete tokens
    const deleteToken = await services.removeTokensToDb(referenceTokenDetails);

    if (!deleteToken) return next(new appError("token not delete", 404));

    // id generation
    const accessId = createId.accessId();
    const refreshId = createId.refreshId();
    //token generation
    const accessToken = jwt.createNewAccessToken(User._id, "accessToken");
    const refreshToken = jwt.createNewRefreshToken(User._id, "refreshToken");

    if (!accessToken || !refreshToken) {
      return next(new appError("something wrong in token generation", 400));
    }
    // save token to db
    const newAccessToken = {
      _id: accessId,
      reference: refreshId,
      token: accessToken,
      type: "accessToken",
    };
    const saveAccessToken = await services.saveTokenToDB(newAccessToken);

    const newRefreshToken = {
      _id: refreshId,
      reference: accessId,
      token: refreshToken,
      type: "refreshToken",
    };
    const saveRefreshToken = await services.saveTokenToDB(newRefreshToken);

    return res
      .status(200)
      .setHeader("access", accessToken)
      .setHeader("refresh", refreshToken)
      .json({
        message: "refresh successfully",
        accessToken,
        refreshToken,
      });
  } catch (error) {
    next(new appError(error.message, 500));
  }
};

const logout = async (req, res, next) => {
  try {
    let accessToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) next(new appError("AccessToken is required", 400));
    // check access token
    const checkToken = await services.isTokensExist(accessToken);

    if (!checkToken)
      return next(new appError("access token  did not found", 404));
    // decode the token
    const decode = await services.TokenDecode(accessToken);
    if (!decode) return next(new appError("access token not decode", 404));
    // find the user
    const User = await services.checkUserIsExist(decode);
    if (!User) return next(new appError("not a user", 404));
    // delete the tokens
    const deleteToken = await services.removeTokensToDb(checkToken.id);

    return res.status(200).send("logOut successFully");
  } catch (error) {
    next(new appError(error.message, 500));
  }
};

const changePassword = async (req, res, next) => {
  try {
    let accessToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) next(new appError("AccessToken is required", 400));
    // check Access Token
    const checkToken = await services.isTokensExist(accessToken);

    if (!checkToken)
      return next(new appError("access token  did not found", 404));
    // get the user details
    const userData = {
      email: req.body.email,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    };
    // find the user
    const checkUser = await services.findUserUsingEmail(userData.email);
    if (!checkUser)
      return next(new appError("wrong email or user not found", 404));
    console.log(checkUser);
    // compare the password
    const passwordCompare = await services.comparePassword(
      userData.oldPassword,
      checkUser.password
    );
    if (!passwordCompare)
      return next(new appError("not a existing oldPassword", 404));
    // hashing the new password
    const userNewPassword = await services.passwordHashing(
      userData.newPassword
    );
    if (!userNewPassword) return next(new appError("not hashing", 404));
    // update the password
    const updatePassword = await services.passwordUpdate(
      checkUser.email,
      userNewPassword
    );
    if (!updatePassword) return next(new appError("not update Password", 404));

    return res.status(200).send("password update");
  } catch (error) {
    next(new appError(error.message, 500));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const findUser = await services.findUserUsingEmail(email);
    if (!findUser)
      return next(
        new appError(`${email} is not a valid email. provide valid email`, 404)
      );
    const userName = findUser.name;
    const Token = await jwt.createResetPasswordToken(
      findUser._id,
      "resetPasswordToken"
    );
    if (!Token) {
      return next(new appError("something wrong in token generation", 400));
    }
    const sendEmail = await services.sendMail(userName, email, Token);
    if (!sendEmail) return next(new appError(`email not send`, 404));

    const saveToken = {
      token: Token,
      type: "resetPasswordToken",
    };
    const saveResetPasswordToken = await services.saveTokenToDB(saveToken);
    return res.status(200).json({
      message: "the reset password token is sended",
      Token,
    });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const ResetPassword = req.query.token;
    if (!ResetPassword)
      return next(new appError("resetPassword token is required", 404));

    const checkResetPasswordTokenIsExist = await services.isTokensExist(
      ResetPassword
    );
    if (!checkResetPasswordTokenIsExist)
      return next(new appError("Token not found", 404));

    const decodeResetPasswordToken = await services.TokenDecode(ResetPassword);
    if (!decodeResetPasswordToken)
      return next(new appError("Token not decoded", 400));

    const findUser = await services.checkUserIsExist(decodeResetPasswordToken);
    if (!findUser) return next(new appError("user not found", 404));

    const newPassword = req.body.newPassword;
    const hashPassword = await services.passwordHashing(newPassword);
 
    const removeToken = await services.removeTokensToDb(checkResetPasswordTokenIsExist._id);

    //id generation
    const accessId = createId.accessId();
    const refreshId = createId.refreshId();
    // token generation
    const accessToken = jwt.createNewAccessToken(findUser._id, "accessToken");
    const refreshToken = jwt.createNewRefreshToken(
      findUser._id,
      "refreshToken"
    );
    if (!accessToken || !refreshToken) {
      return next(new appError("something wrong in token generation", 400));
    }
    //token saving
    const newAccessToken = {
      _id: accessId,
      reference: refreshId,
      token: accessToken,
      type: "accessToken",
    };
    const saveAccessToken = await services.saveTokenToDB(newAccessToken);

    const newRefreshToken = {
      _id: refreshId,
      reference: accessId,
      token: refreshToken,
      type: "refreshToken",
    };
    const saveRefreshToken = await services.saveTokenToDB(newRefreshToken);

    if (!saveAccessToken || !saveRefreshToken) {
      return next(new appError("something wrong token saving ", 400));
    }
    return res
      .status(200)
      .setHeader("access", accessToken)
      .setHeader("refresh", refreshToken)
      .json({
        message: "new tokens after reset password",
        accessToken,
        refreshToken,
      });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

module.exports = {
  login,
  tokenRefresh,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
};
