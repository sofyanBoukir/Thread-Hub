import axios from "axios"

export const editProfile = (data,token) =>{
    const response = axios.post('http://localhost:8000/api/profile/editProfile',data,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}

export const viewUser = (username) =>{
    const response = axios.get(`http://localhost:8000/api/profile/viewUserData?username=${username}`);
    return response;
}