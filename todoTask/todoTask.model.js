const mongoose = require("mongoose");
const schema = mongoose.Schema;
const taskItem = new schema({
userId:{type:mongoose.Types.ObjectId, require:true},
task:{type:String, require:true},
description:{type:String, require:false},
status:{type:String, require:false, default:"Activate"}
});

const task = mongoose.model("todoTask", taskItem);
module.exports.task = task;