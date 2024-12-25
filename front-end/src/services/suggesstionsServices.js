import axios from "axios";

export const getSuggesstionUsers = (token) =>{
    const response = axios.get('http://localhost:8000/api/suggestions/suggestionUsers',{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    })
    return response;
}

export const getSuggesstionCommunities = (token) =>{
    const response = axios.get('http://localhost:8000/api/suggestions/suggestionCommunities',{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    })
    return response;
}

export const searchUsers  = (token,query) =>{
    const response = axios.get(`http://localhost:8000/api/searchUsers?searchedQuery=${query}`,
        {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
    return response;
}