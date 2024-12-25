import { Header } from "../../components/layout/Header"
import { LeftBar } from "../../components/layout/LeftBar"
import { RightBar } from "../../components/layout/RightBar";
import { BottomBar } from "../../components/layout/BottomBar";
import { Thread } from "../../components/ThreadComponents/Thread";
import { useParams } from "react-router-dom";
import { viewUser } from "../../services/profileServices";
import { useEffect, useState } from "react";
import moment from "moment";
export const ViewUser = () => {
  
    const {username} = useParams();
    const [userData,setUserData] = useState({})
    const getUserData = async () =>{
        const response = await viewUser(username);
        if(response.data.userdata){
            setUserData(response.data.userdata);
        }
    }

    useEffect(() =>{
        getUserData();
    },[username])
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
                        <div>
                            <img src={userData.profile_picture} alt="profile" className="w-20 h-20 rounded-full"/>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold">{userData.full_name}</h1>
                            <span className="font-semibold text-gray-500">@{userData.username}</span><br></br>
                            <span className="font-semibold text-gray-500">joined at {moment(userData).format('DD-MM-YYYY')}</span>
                        </div>
                    </div>
                </div>
                <div className="px-6">
                    <span className="text-gray-500">{userData.bio}</span>
                </div>
                <hr className="h-px my-2 mx-6 bg-gray-200 border-0 dark:bg-gray-800"></hr>
                <div className="w-[100%] lg:w-[100%] mt-5 flex items-center flex-col gap-8">
                    {/* <Thread />
                    <Thread />
                    <Thread /> */}
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
  