import { Header } from "../../components/layout/Header"
import { LeftBar } from "../../components/layout/LeftBar"
import { RightBar } from "../../components/layout/RightBar";
import { BottomBar } from "../../components/layout/BottomBar";
import { Thread } from "../../components/ThreadComponents/Thread";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import { getCommunityDataSer } from "../../services/communityServices";
export const ViewCommunity = () => {
  
    const {communityId} = useParams();
    const [communityThreads,setCommunityThreads] = useState([]);
    const [communityData,setCommunityData] = useState({})
    const [loading,setLoading] = useState(null);
    
    const getCommunityData = async () =>{
        setLoading(true);
        const response = await getCommunityDataSer(communityId);
        setLoading(false);
        console.log(response);
        
        if(response.data.community){
            setCommunityData(response.data.community);
        }
        if(response.data.communityThreads){
            setCommunityThreads(response.data.communityThreads);
        }
    }
  
    useEffect(() =>{
        getCommunityData();
    },[])
    return (
      <div className="flex flex-col h-screen">
        <div className="fixed top-0 left-0 w-full z-10">
          <Header />
        </div>
        <div className="flex flex-row pt-16 gap-1">
          <LeftBar />
          <div className="flex flex-row lg:ml-[18%] w-[100%] mb-20">
            <div className="w-[100%] lg:w-[70%] px-5 mt-5 flex flex-col gap-3">
                <div className="flex gap-5 items-center justify-between px-6">
                    <div className="flex gap-2 items-center">
                        {
                            !loading ?
                                <>
                                    <div>
                                        <img src={communityData.picture} alt="profile" className="w-20 h-20 rounded-lg"/>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-semibold">{communityData.description?communityData.description.substr(0,30):null}</h1>
                                        <span className="font-semibold text-gray-500">Created by <Link to={`/search/${communityData.user?communityData.user.username:null}`} className="text-blue-600">{communityData.user?communityData.user.username:null}</Link></span><br></br>
                                        <span className="font-semibold text-gray-500">Created at {moment(communityData.created_at).format('DD-MM-YYYY')}</span>
                                    </div>
                                </>
                            :null
                        }
                    </div>
                </div>
                <hr className="h-px my-2 mx-6 bg-gray-200 border-0 dark:bg-gray-800"></hr>
                <div className="w-[100%] lg:w-[100%] mt-5 flex items-center flex-col gap-8">
                    {
                      loading && <CircularProgress />
                    }
                    {
                      communityThreads && communityThreads.length ?
                        communityThreads.map((thread) =>{
                          return <Thread thread={thread}/>
                        })
                      :<span className="text-xl font-semibold">This community doesn't have any threads!</span>
                    }
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
  