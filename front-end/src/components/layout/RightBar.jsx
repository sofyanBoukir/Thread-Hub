import { useEffect, useState } from "react";
import { SuggestedCommunityOrUser } from "./SingleComponents/SuggestedCommunityOrUser"
import { getSuggesstionCommunities, getSuggesstionUsers } from "../../services/suggesstionsServices";

export const RightBar = () => {
  const [suggesstionUsers,setSuggestionsUsers] = useState([]);
  const token = localStorage.getItem("token");
    
  const fetchSuggestions = async () =>{
    const response = await getSuggesstionUsers(token);
    setSuggestionsUsers(response.data.suggestionUsers);    
  }
    
  useEffect(() =>{
    fetchSuggestions();
  },[])

  return (
    <div className="bg-dark w-[100%] pt-1 lg:flex hidden flex-col gap-2 h-screen px-3 ">
      <h1 className="text-xl font-semibold">Similar minds</h1>
      <div className="flex flex-col gap-3 h-screen mt-5">
        {
          suggesstionUsers && suggesstionUsers ?
          suggesstionUsers.map((user) => {
            return <SuggestedCommunityOrUser  user={user}/>
          }):null
        }
      </div>
      <br></br>
      <br></br>
      <h1 className="text-xl font-semibold">Suggested communities minds</h1>
      {/* <div className="flex flex-col gap-2 h-screen mt-5">
        <SuggestedCommunityOrUser />
        <SuggestedCommunityOrUser />
        <SuggestedCommunityOrUser />
        <SuggestedCommunityOrUser />
      </div> */}
    </div>
  )
}
