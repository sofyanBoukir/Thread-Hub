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

export const getUserCommunities = async (token) =>{
    const response = await axios.get("http://localhost:8000/api/community/userCommunities",{
        headers : {
            "Authorization" : `Bearer ${token}`,
        }
    });
    return response;
}

export const getCommunityDataSer = async (communityId) =>{
    const response = await axios.get(`http://localhost:8000/api/community/getSingleCommunity?communityId=${communityId}`);
    return response;
}

export const acceptCommunityInvitation = async (data) =>{
    const response = await axios.post("http://localhost:8000/api/community/acceptCommunityInvitation",data);
    return response;
}


export const getMembers = async (communityId) =>{
    const response = await axios.get(`http://localhost:8000/api/community/getCommunityMembers?communityId=${communityId}`);
    return response;
}
