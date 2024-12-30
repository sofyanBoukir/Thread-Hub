import axios from "axios"

export const createCommunity = async (data,token) =>{
    const response = await axios.post("http://localhost:8000/api/community/createCommunity",data,{
        headers:{
            "Authorization" : `Bearer ${token}`,
        }
    });
    return response;
}

export const sendCommunityInvitation = async (data) =>{
    const response = await axios.post("http://localhost:3000/api/notifications/postCommunityInvitationNotification",data);
    return response;
}