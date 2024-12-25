import axios from "axios"

export const createThread = async (data,token) =>{
    const response = await axios.post('http://localhost:8000/api/thread/postThread',data,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}