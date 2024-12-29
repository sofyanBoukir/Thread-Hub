import { Header } from "../../components/layout/Header"
import { LeftBar } from "../../components/layout/LeftBar"
import { RightBar } from "../../components/layout/RightBar";
import { BottomBar } from "../../components/layout/BottomBar";
import { Button } from "../../components/UI/Button";
import { useEffect, useState } from "react";
import { Thread } from "../../components/ThreadComponents/Thread";
import { EditProfile } from "../../components/Profile/EditProfile";
import { getUserThreads } from "../../services/threadServices";
import { CircularProgress } from "@mui/material";
export const Profile = () => {

  const [open,setOpen] = useState(false);
  const [threads,setThreads] = useState([]);
  const [loading,setLoading] = useState(false);

  const openEditProfile = () => {
    setOpen(true);
  }
  const userData = JSON.parse(localStorage.getItem("user"));  

  const getThreads = async () =>{
    setLoading(true);
    const response = await getUserThreads(userData.id);    
    if(response.data.threads){  
      setThreads(response.data.threads);  
      setLoading(false);
    }
  }
  useEffect(() =>{
    getThreads();
  },[])
    return (
      <div className="flex flex-col h-screen">
        <div className="fixed top-0 left-0 w-full z-10">
          <Header />
        </div>
        <div className="flex flex-row pt-16 gap-1">
          <LeftBar />
          <div className="flex flex-row lg:ml-[18%] w-[100%] mb-20">
            {
              !open?
                <div className="w-[100%] lg:w-[70%] px-5 mt-5 flex flex-col gap-3">
                  <div className="flex gap-5 items-center justify-between px-6">
                      <div className="flex gap-2 items-center">
                          <div>
                              <img src={userData.profile_picture} alt="profile" className="w-20 h-20 rounded-full"/>
                          </div>
                          <div>
                              <h1 className="text-2xl font-semibold">{userData.full_name}</h1>
                              <span className="font-semibold text-gray-500">@{userData.username}</span>
                          </div>
                      </div>
                      <div>
                          <Button text={"Edit"} bg={"bg-gray-800"} onClick={openEditProfile}/>
                      </div>
                  </div>
                  <div className="px-6">
                      <span className="text-gray-500">{userData.bio ? userData.bio : "No bio yet"}</span>
                  </div>
                  <hr className="h-px my-2 mx-6 bg-gray-200 border-0 dark:bg-gray-800"></hr>
                  <div className="w-[100%] lg:w-[100%] mt-5 flex items-center flex-col gap-8">
                    {
                      loading && <CircularProgress />
                    }
                    {
                      threads && threads.length ?
                        threads.map((thread) =>{
                          return <Thread thread={thread}/>
                        })
                      :null
                    }
                  </div>
              </div>
              : 
              <div className="w-[100%] lg:w-[70%] px-5 mt-5 flex flex-col gap-3">
                <EditProfile />
              </div>

            }
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
  