const Comment = require("../models/Comment")


const getThreadComments = async (request,response) =>{
    const comments = await Comment.find({threadId:request.query.threadId});
    response.status(200).json(comments)
}

const insertComment = async (request,response) =>{
    const {content,threadId,posterId} = request.body;
    try{
        const comment = new Comment({
            posterId,
            threadId,
            content,
        });
        await comment.save();
        response().statu(200).json({
            "message" : "new Comment posted on this thread",
        });
        
    }catch(error){
        response.status(500).json({
            "message" : error,
        })
    }
}

module.exports = {getThreadComments,insertComment}