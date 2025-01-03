import { useEffect, useState } from "react";
import { SuggestedCommunityOrUser } from "./SingleComponents/SuggestedCommunityOrUser"
import { getSuggesstionCommunities, getSuggesstionUsers } from "../../services/suggesstionsServices";
import { LinearProgress } from "@mui/material";

export const RightBar = () => {
  const [suggesstionUsers,setSuggestionsUsers] = useState([]);
  const token = localStorage.getItem("token");
  const [loading,setLoading] = useState(false);    
  
  const fetchSuggestions = async () =>{
    setLoading(true);
    const response = await getSuggesstionUsers(token);
    setSuggestionsUsers(response.data.suggestionUsers);    
    setLoading(false);
  }
    
  useEffect(() =>{
    fetchSuggestions();
  },[])

  return (
    <div className="bg-dark w-[100%] pt-1 lg:flex hidden flex-col gap-2 h-screen px-3 ">
      <h1 className="text-xl font-semibold">Suggested users</h1>
      <div className="flex flex-col gap-3 h-screen mt-5">
        {
          loading && <LinearProgress />
        }
        {
          suggesstionUsers && suggesstionUsers ?
          suggesstionUsers.map((user) => {
            return <SuggestedCommunityOrUser  user={user}/>
          }):null
        }
      </div>
    </div>
  )
}
