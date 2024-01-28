const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todoTaskItem = new schema({
  taskItem: {type:String, required:true},
  dueDate: {type:Date, required:false},
  isDon: {type:String, required:false, default: false},
  reference: {type:mongoose.Types.ObjectId,required:true},
  refUserId: {type:mongoose.Types.ObjectId,required:true},
}, {timestamps:true});

const taskItem = mongoose.model("todo Task Items", todoTaskItem);
module.exports.taskItem = taskItem;
