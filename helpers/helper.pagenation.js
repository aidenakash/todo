const { task } = require("../todoTask/todoTask.model");
const { taskItem } = require("../todoTaskItem/todoTaskItem.model");
const taskItemRepository = require("../todoTaskItem/todoTaskItem.repository")
const taskRepository = require("../todoTask/todoTask.repository")

const taskPagination = async(page,limit, userId)=>{

    const startIndex = (page -1)*limit;
    const endIndex = page * limit ;

    const result ={} ;

if(endIndex < await task.countDocuments()){
    result.next ={
        page:page+1,
        limit:limit
    }
}
    if(startIndex>0){
        result.previous = {
            page:page -1,
            limit:limit
        }
    }

    try {
        result.result = await taskRepository.findTaskAndItemPagination(userId, limit, startIndex)
        return result;
        
    } catch (error) {
        throw(error.message)
    }

};

const taskItemPagination =async (page,limit, taskId)=>{
    const startIndex = (page -1)*limit;
    const endIndex = page * limit ;

    const result ={} ;

if(endIndex < await taskItem.countDocuments()){
    result.next ={
        page:page+1,
        limit:limit
    }
}
    if(startIndex>0){
        result.previous = {
            page:page -1,
            limit:limit
        }
    }

    try {
        result.result = await taskItemRepository.paginate(taskId, limit, startIndex)
        return result;
        
    } catch (error) {
        throw(error.message)
    }
};


module.exports= {taskPagination, taskItemPagination}