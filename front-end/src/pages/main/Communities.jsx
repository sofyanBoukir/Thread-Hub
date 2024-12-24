import { Header } from "../../components/layout/Header"
import { LeftBar } from "../../components/layout/LeftBar"
import { RightBar } from "../../components/layout/RightBar";
import { BottomBar } from "../../components/layout/BottomBar";
import { Button } from "../../components/UI/Button";
import { useState } from "react";
import { CreateCommunity } from "../../components/CommunitiesComps/CreateCommunity";
export const Communities = () => {
    const [handleCreateCommunity,setHandleCreateCommunity] = useState(false)
    return (
        <>
            <div className={`flex flex-col h-screen ${handleCreateCommunity ? 'blur pointer-events-none' : null}`}>
                <div className="fixed top-0 left-0 w-full z-10">
                <Header />
                </div>
                <div className="flex flex-row pt-16 gap-1">
                <LeftBar />
                <div className="flex flex-row lg:ml-[18%] w-[100%]">
                    <div className="w-[100%] lg:w-[70%] px-5 mt-2 flex flex-col gap-8">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-semibold">Communities</h1>
                            <Button text={"Create new"} width={"w-[10%]"} onClick={() => setHandleCreateCommunity(true)}/>
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
        </>
      
    );
  };    
  