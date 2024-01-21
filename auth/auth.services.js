const repository = require("./auth.repository");
const bcrypt = require("bcrypt");
const decode = require("../helpers/helper.decode");
const email = require("../helpers/helper.nodeMailer")

const findUser = async (email, password) => {
  const checkUserEmail = await repository.checkEmail(email);
  const checkUserPassword = await bcrypt.compare(
    password,
    checkUserEmail.password
  );

  if (checkUserEmail && checkUserPassword) return checkUserEmail;
  return false;
};

const saveTokenToDB = async (newToken) => {
  return await repository.createToken(newToken);
};

const isTokensExist = async (token) => {
  const checkToken = await repository.getToken(token);

  if (!checkToken) return false;
  return checkToken;
};

const TokenDecode = async (Token) => {
  const tokenDecode = await decode.tokenDecode(Token);
  const userId = tokenDecode;
  return userId;
};

const checkUserIsExist = async (id) => {
  const User = await repository.findUser(id);
  return User;
};

const removeTokensToDb = async (id) => {
  const del = await repository.deleteToken(id);
  return del;
};

const findUserUsingEmail = async (email) => {
  const checkUserEmail = await repository.checkEmail(email);
  if (!checkUserEmail) return false;
  return checkUserEmail;
};

const comparePassword = async (oldPassword, newPassword) => {
  const password = await bcrypt.compare(oldPassword, newPassword);
  if (!password) return false;
  return password;
};

const passwordHashing = async (password) => {
  const newPassword = await bcrypt.hash(password, 12);
  if (!newPassword) return false;
  return newPassword;
};

const passwordUpdate = async (email, password) => {
  const updatePassword = await repository.updatePassword(email, password);
  if (!updatePassword) return false;
  return updatePassword;
};

const sendMail  =async  (name,userEmail,token)=>{
const sendEmail = await email.sendEmail(name,userEmail,token);
if(!sendEmail)return false
return true

}

module.exports = {
  findUser,
  saveTokenToDB,
  isTokensExist,
  TokenDecode,
  checkUserIsExist,
  removeTokensToDb,
  findUserUsingEmail,
  comparePassword,
  passwordHashing,
  passwordUpdate,
  sendMail
};
