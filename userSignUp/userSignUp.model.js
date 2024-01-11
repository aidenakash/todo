const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
    name : {type :String, required: true},
    gender :{type : String, enum: ["male","female","other"], required :true},
    email: {type : String, unique: true, required: true},
    password : {type : String , required : true, select :false},
    phone : {type :String , min: 10 , max:10, required:true},
    isDelete : { type: Boolean , default : false}
},{timestamps: true}
);

const user = mongoose.model("user",userSchema);
module.exports.user= user