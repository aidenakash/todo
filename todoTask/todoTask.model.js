const mongoose = require("mongoose");
const schema = mongoose.Schema;
const taskItem = new schema({
userId:{type:mongoose.Types.ObjectId, required:true},
task:{type:String, required:true},
description:{type:String, required:false},
status:{type:String, enum:["Active","deActive"], required:false, default:"Active"}
},{timestamps:true});

const task = mongoose.model("todo Task", taskItem);
module.exports.task = task;