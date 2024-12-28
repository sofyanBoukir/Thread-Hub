const Notification = require("../models/Notification")

const postLikeNotification = async (request,response) =>{

    const {senderId,threadId} = request.body;
    try{
        const notification = new Notification({
            notificationType:"like",
            notificationContent : "liked your thread",
            senderId,
            threadId,
            receiverId,
        })
        await notification.save();

    }catch(error){
        response.status(500).json({
            "message" : "error"
        })
    }
}

const postCommentNotification = async (request,response) =>{

    const {senderId,threadId} = request.body;
    try{
        const notification = new Notification({
            notificationType:"comment",
            notificationContent : "commented on your thread",
            senderId,
            threadId,
            receiverId,
        })
        await notification.save();
        
    }catch(error){
        response.status(500).json({
            "message" : "error"
        })
    }
}

const postCommunityInvitationNotification = async (request,response) =>{

    const {senderId,receiverId,communityId,} = request.body;
    try{
        const notification = new Notification({
            notificationType:"communityInvitation",
            notificationContent : "Invited you to community",
            senderId,
            receiverId,
            communityId,
        })
        await notification.save();
        response.status(200).json({
            "sended" : true,
            "message" : "Invitation sent"
        });
    }catch(error){
        response.status(500).json({
            "message" : "error"
        })
    }
}

const getNotifications = async (request,response) =>{
    const receiverId = request.query.receiverId;
    const notifications = await Notification.find({receiverId:receiverId});
    response.status(200).json({
        "notifications" : notifications,
    })
}

module.exports = {getNotifications,postLikeNotification,postCommentNotification,postCommunityInvitationNotification};
