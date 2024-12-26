import { Header } from "../../components/layout/Header"
import { LeftBar } from "../../components/layout/LeftBar"
import { RightBar } from "../../components/layout/RightBar";
import { BottomBar } from "../../components/layout/BottomBar";
import { Thread } from "../../components/ThreadComponents/Thread";
import { useEffect, useState } from "react";
import { getHomeThreads } from "../../services/threadServices";
import { CircularProgress } from "@mui/material";
export const Home = () => {

  const [threads,setThreads] = useState([]);
  const [loading,setLoading] = useState(false);

  const getThreads = async () =>{
    setLoading(true);
    const response = await getHomeThreads();
    if(response.data.threads){
      setLoading(false);
      setThreads(response.data.threads)
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
          <div className="flex flex-row lg:ml-[18%] w-[100%]">
            <div className="w-[100%] lg:w-[70%] mt-5 flex items-center flex-col gap-8 mb-20">
              {
                loading && <CircularProgress />
              }
              {
                threads && threads.length ?
                  threads.map((thread) =>{
                    return <Thread thread={thread} />
                  })
                :null
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
  