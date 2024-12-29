const Comment = require("../models/Comment")


const getThreadComments = async (request,response) =>{
    const comments = await Comment.find({threadId:request.query.threadId});
    response.status(200).json({
        "comments" : comments,
    })
}

const insertComment = async (request,response) =>{
    const {content,threadId,posterUsername,posterProfile} = request.body;
    try{
        const comment = new Comment({
            posterUsername,
            posterProfile,
            threadId,
            content,
        });
        await comment.save();
        response.status(200).json({
            "posted" : true,
            "message" : "new Comment posted on this thread",
        });
        
    }catch(error){
        response.status(500).json({
            "message" : error,
        })
    }
}

const deleteComment = async (request,response) =>{
    const {commentId} = request.query;

    try{
        const dComment = await Comment.deleteOne({_id:ObjectId(commentId)});
        resp
        if(dComment.deletedCount === 1){
            response.status(200).json({
                "message" : "deleted!",
            });
        }
    }catch(error){
        response.status(500).json({
            "message" : error,
        })
    }
}

module.exports = {getThreadComments,insertComment,deleteComment}