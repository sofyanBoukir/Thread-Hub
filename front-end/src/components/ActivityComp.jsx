import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "./UI/Button";
import { useState } from "react";

export const ActivityComp = ({notification}) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);

  const acceptInvitation = async () =>{
    const response = await accept({communityId:notification.communityId,userId:userData.userId});
  }
  return (
    <div className='bg-dark rounded-md flex justify-between items-center px-5 py-3 hover:bg-black cursor-pointer duration-200' 
    onClick={() => notification.notificationType === 'comment' || notification.notificationType === 'like'?navigate(`/avtivity/viewThread/${notification.threadId}`): navigate(`/communities/community/${notification.communityId}`)}>
        <div className="flex gap-2 items-center">
          <img src={notification.posterProfile} className='h-8 w-8 rounded-full'/>
          <div>
            <p className='font-semibold'><span className="text-blue-400">{notification.posterUsername === userData.username ?"You" : notification.posterUsername} </span>{notification.notificationContent}</p>
            <span className="text-gray-500 text-sm">{moment(notification.created_at).fromNow()}</span>
          </div>
        </div>
        <div>
          {
            notification.notificationType === 'communityInvitation'?
              <Button text={"Accept"} onClick={(event) => {
                  event.stopPropagation(); 
                  alert("cc");
              }}/>
            :null
          }
        </div>
    </div>
  )
}
