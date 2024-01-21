const { ObjectId } = require("mongodb");

const accessId = () =>{
    const createAccessId = new ObjectId();
    return createAccessId

};

const refreshId = ()=>{
    const createRefreshId = new ObjectId();
    return createRefreshId
};

module.exports ={refreshId,accessId}