const jwt = require("jsonwebtoken");

const createNewAccessToken = (id, type) => {
  const createAccessToken = jwt.sign(
    { id: id, type: type },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return createAccessToken;
};

const createNewRefreshToken = (id, type) => {
  const createRefreshToken = jwt.sign(
    { id: id, type: type },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN }
  );
  return createRefreshToken;
};

const createResetPasswordToken = (id, type) => {
  const createResetToken = jwt.sign(
    { id: id, type: type },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_FORGET_PASSWORD_TOKEN_EXPIRES_IN }
  );
  return createResetToken;
};

module.exports = {
  createNewAccessToken,
  createNewRefreshToken,
  createResetPasswordToken,
};
