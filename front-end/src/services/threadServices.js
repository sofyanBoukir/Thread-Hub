import axios from "axios"

export const createThread = async (data,token) =>{
    const response = await axios.post('http://localhost:8000/api/thread/postThread',data,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}

export const getUserThreads = async (id) =>{
    const response = await axios.get(`http://localhost:8000/api/thread/getUserThreads?id=${id}`);
    return response;
}

export const getHomeThreads = async () =>{
    const response = await axios.get('http://localhost:8000/api/thread/getHomeThreads');
    return response;
}

export const deleteThread = async (threadId,token) =>{
    const response = await axios.delete(`http://localhost:8000/api/thread/deleteThread/${threadId}`,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}