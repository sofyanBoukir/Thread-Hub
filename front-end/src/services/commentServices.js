import axios from "axios"

export const postComment = async (data) =>{
    const response = await axios.post("http://localhost:3000/api/comments/postComment",data);
    return response;
}

export const getThreadComments = async (threadId) =>{
    const response = await axios.get(`http://localhost:3000/api/comments?threadId=${threadId}`);
    return response;
}

export const deleteComment = async (commentId) =>{
    const response = await axios.delete(`http://localhost:3000/api/comments/deleteComment?commentId=${commentId}`);
    return response;
}