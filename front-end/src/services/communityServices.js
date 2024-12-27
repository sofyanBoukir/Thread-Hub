import axios from "axios"

export const createCommunity = async (data,token) =>{
    const response = await axios.post("http://localhost:8000/api/community/createCommunity",data,{
        headers:{
            "Authorization" : `Bearer ${token}`,
        }
    });
    return response;
}