import { Header } from "../../components/layout/Header"
import { LeftBar } from "../../components/layout/LeftBar"
import { RightBar } from "../../components/layout/RightBar";
import { BottomBar } from "../../components/layout/BottomBar";
import { SuggestedCommunityOrUser } from "../../components/layout/SingleComponents/SuggestedCommunityOrUser";
import { useEffect, useState } from "react";
import { searchUsers } from "../../services/suggesstionsServices";
import { LinearProgress } from "@mui/material";
export const Search = () => {
  const [query,setQuery] = useState('');
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);

  const getSearchedUsers = async () =>{
    setLoading(true);
    const response = await searchUsers(localStorage.getItem("token"),query);
    setLoading(false)
    if(response.data.users){
      setUsers(response.data.users)
    }
  }

  useEffect(() =>{
    if(query !== ''){
      getSearchedUsers();
    }
  },[query])
  
    return (
      <div className="flex flex-col h-screen">
        <div className="fixed top-0 left-0 w-full z-10">
          <Header />
        </div>
        <div className="flex flex-row pt-16 gap-1">
          <LeftBar />
          <div className="flex flex-row lg:ml-[18%] w-[100%]">
            <div className="w-[100%] lg:w-[70%] px-5 mt-2 flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-semibold">Search</h1>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="px-3 py-2 text-gray-500 bg-dark rounded-md outline-none w-[100%] mt-5 border-2 border-gray-800"
                    placeholder="Search for users"/>
                    <div className="flex flex-col gap-5 mt-8">
                        {
                          loading && <LinearProgress />
                        }
                        {
                          users && users.length?
                            users.map((user) =>{
                              return <SuggestedCommunityOrUser user={user} />
                            })
                          :null
                        }
                    </div>
                </div>
            </div>
            <div className="lg:w-[30%]">
              <RightBar />
            </div>
          </div>
        </div>
        <div className="block lg:hidden">
          <BottomBar />
        </div>
      </div>
    );
  };
  