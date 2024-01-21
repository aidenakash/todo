const jwt = require("jsonwebtoken");

const tokenDecode = (token)=>{

const decode = jwt.verify(token,process.env.JWT_SECRET);
console.log(decode.id);
return decode.id
};
module.exports = {tokenDecode}

