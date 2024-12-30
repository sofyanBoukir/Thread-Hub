import axios from "axios";

export const postCommentNotification = async (data) =>{
    const response = await axios.post("http://localhost:3000/api/notifications/postCommentNotification",data);
    return response;
}

export const getUserNotifications = async (receiverId) =>{
    const response = await axios.get(`http://localhost:3000/api/notifications/postCommentNotification?receiverId=${receiverId}`);
    return response;
}