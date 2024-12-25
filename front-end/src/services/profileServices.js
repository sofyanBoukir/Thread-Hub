import axios from "axios"

export const editProfile = (data,token) =>{
    const response = axios.post('http://localhost:8000/api/profile/editProfile',data,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}