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

    const {posterUsername,posterProfile,receiverId,threadId} = request.body;
    try{
        const notification = new Notification({
            notificationType:"comment",
            notificationContent : "commented on your thread",
            posterUsername,
            posterProfile,
            threadId,
            receiverId,
        })
        await notification.save();
        response.status(200).json({
            "sended" : true,
        });
    }catch(error){
        response.status(500).json({
            "message" : "error"
        })
    }
}

const postCommunityInvitationNotification = async (request,response) =>{

    const { posterUsername, posterProfile, communityId } = request.body;
    
    try{
        const communityMembers = [];
        if (request.body.communityMembers && Array.isArray(request.body.communityMembers)) {
            request.body.communityMembers.forEach((member) => {
                const id = parseInt(member.id, 10);
                if (!isNaN(id)) {
                    communityMembers.push(id);
                } else {
                    console.error(`Invalid member ID: ${member.id}`);
                }
            });
        } else {
            console.error("communityMembers is not an array or is missing");
        }

        const notifications = communityMembers.map((id) => ({
            notificationType: "communityInvitation",
            notificationContent: "Invited you to community",
            posterUsername,
            posterProfile,
            receiverId: id, 
            communityId,
        }));
        

        await Notification.insertMany(notifications);
        response.status(200).json({
            "sended" : true,
            "message" : "Invitation sent"
        });
    }catch(error){
        response.status(500).json({
            "message" : "error on server"
        })
    }
}

const getNotifications = async (request,response) =>{
    const receiverId = request.query.receiverId;
    const notifications = await Notification.find({receiverId});
    response.status(200).json({
        "notifications" : notifications,
    })
}

module.exports = {getNotifications,postLikeNotification,postCommentNotification,postCommunityInvitationNotification};
