import { Header } from "../../components/layout/Header"
import { LeftBar } from "../../components/layout/LeftBar"
import { RightBar } from "../../components/layout/RightBar";
import { BottomBar } from "../../components/layout/BottomBar";
import { Button } from "../../components/UI/Button";
import { useEffect, useState } from "react";
import { CreateCommunity } from "../../components/CommunitiesComps/CreateCommunity";
import { SingleCommunity } from "../../components/CommunitiesComps/SingleCommunity";
import { EditCommunity } from "../../components/CommunitiesComps/EditCommunity";
import { getUserCommunities } from "../../services/communityServices";
import { LinearProgress } from "@mui/material";
export const Communities = () => {
    const [handleCreateCommunity,setHandleCreateCommunity] = useState(false)
    const [handleEditCommunity,setHandleEditCommunity] = useState(false)
    const [loading,setLoading] = useState(false);

    const [communities,setCommunities] = useState([]);

    const getCommunities = async () =>{
        setLoading(true);
        const response = await getUserCommunities(localStorage.getItem("token"));
        setLoading(false);
        if(response.data.communities){
            setCommunities(response.data.communities);
        }
    }
    useEffect(() =>{
        getCommunities()
    },[])
    return (
        <>
            <div className={`flex flex-col h-screen ${handleCreateCommunity || handleEditCommunity ? 'blur pointer-events-none' : null}`}>
                <div className="fixed top-0 left-0 w-full z-10">
                <Header />
                </div>
                <div className="flex flex-row pt-16 gap-1">
                <LeftBar />
                <div className="flex flex-row lg:ml-[18%] w-[100%] mb-20">
                    <div className="w-[100%] lg:w-[70%] px-5 mt-2 flex flex-col gap-8">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-semibold">Communities</h1>
                            <Button text={"Create new"} width={"w-[10%]"} onClick={() => setHandleCreateCommunity(true)}/>
                        </div>
                        {
                            loading && <LinearProgress /> 
                        }
                        <div className="flex flex-row gap-5 flex-wrap">
                            {
                                communities && communities.length?
                                    communities.map((community) =>{
                                        return <SingleCommunity community={community} handleEditCommunity={handleEditCommunity} setHandleEditCommunity={setHandleEditCommunity} />
                                    })
                                :null
                            }
                        </div>
                    </div>
                    <div className="lg:w-[30%]">
                    <RightBar />
                    </div>
                </div>
                </div>
                <div className="block lg:hidden blur-none">
                <BottomBar />
                </div>
                </div>
                {
                    handleCreateCommunity ?
                        <div className="flex justify-center w-[100%]">
                            <CreateCommunity handleCreateCommunity={handleCreateCommunity} setHandleCreateCommunity={setHandleCreateCommunity}/>
                        </div>
                    :null
                }
                {
                    handleEditCommunity ?
                        <div className="flex justify-center w-[100%]">
                            <EditCommunity handleEditCommunity={handleEditCommunity} setHandleEditCommunity={setHandleEditCommunity}/>
                        </div>
                    :null
                }
        </>
      
    );
  };    
  