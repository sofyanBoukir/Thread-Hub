import { Header } from "../../components/layout/Header"
import { LeftBar } from "../../components/layout/LeftBar"
import { RightBar } from "../../components/layout/RightBar";
import { BottomBar } from "../../components/layout/BottomBar";
import { Button } from "../../components/UI/Button";
import { Label } from "../../components/UI/Label";
import { useEffect, useState } from "react";
import { createThread } from "../../services/threadServices";
import { Notification } from "../../components/UI/Notification";
import { getUserCommunities } from "../../services/communityServices";
import { CircularProgress } from "@mui/material";
export const CreateThread = () => {
  const [thread,setThread] = useState('');
  const [communityId,setCommunityId] = useState(0);
  const [loading,setLoading] = useState(false);
  const [notification,setNotification] = useState({});
  const [communities,setCommunities] = useState([]);
  const [commmunitiesLoading,setCommmunitiesLoading] = useState(false);

  const getCommunities = async () =>{
    try{
      setCommmunitiesLoading(true);
      const response = await getUserCommunities(localStorage.getItem('token'));
      setCommmunitiesLoading(false);
      if(response.data.communities){
        setCommunities(response.data.communities);
      }
    }catch(error){  
      console.log(error)
    }
  }

  useEffect(() =>{
    getCommunities();
  },[]);


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData()
    formData.append("thread",thread);
    if(communityId !== 0){
      formData.append("communityId",communityId);
    }
    setNotification(null)
    setLoading(true);
    try {
      const response = await createThread(formData,localStorage.getItem("token"));
      setLoading(false);
      
        if(response.data.created){
          setNotification({kind:"success",message:response.data.message})
        }
    } catch (error) {
        setLoading(false)
        if(error.response && error.response.data.message){
            setNotification({message:error.response.data.message,kind:"error"})
        }else{
            setNotification({message:"Try again later",kind:"error"})   
        }
    }
  }
    return (
      <div className="flex flex-col h-screen">
        <div className="fixed top-0 left-0 w-full z-10">
          <Header />
        </div>
        <div className="flex flex-row pt-16 gap-1">
          <LeftBar />
          <div className="flex flex-row lg:ml-[18%] w-[100%] mb-20">
            <div className="w-[100%] lg:w-[70%] px-5 mt-2 flex flex-col gap-8">
                <div>
                  <form onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-semibold">Create Thread</h1>
                    <br></br>
                    <Label text={"Choose a community"} /><br></br>
                    {
                      !commmunitiesLoading ?
                        <select className="bg-dark w-[100%] border-2 border-gray-800 px-3 py-1 rounded-sm" value={communityId} onChange={(e) => setCommunityId(e.target.value)}>
                          <option value={0}>Post it to all</option>
                          {
                            communities && communities.length?
                              communities.map((community) =>{
                                return <option value={community.id}>{community.description}</option>
                              })
                            :null
                          }
                        </select> : null
                    }
                    {
                      commmunitiesLoading && <CircularProgress />
                    }
                    <br></br>
                    <br></br>
                    <Label text="Content"/>
                    <textarea value={thread} onChange={(e) => setThread(e.target.value)} 
                    className="px-3 py-2 text-gray-500 bg-dark rounded-md outline-none w-[100%] border-2 border-gray-800 h-80 resize-none"></textarea>
                    <br></br>
                    <br></br>
                    <Button text="Create Thread" className="mt-5" loading={loading}/>
                  </form>
                </div>
                {
                  notification && <Notification kind={notification.kind} text={notification.message}/>
                }
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
  