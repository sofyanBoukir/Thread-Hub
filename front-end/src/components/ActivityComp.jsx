import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "./UI/Button";
import { useState } from "react";
import { acceptCommunityInvitation } from "../services/communityServices";
import { Notification } from "./UI/Notification";
import { deleteNotification } from "../services/notificationsServices";

export const ActivityComp = ({notification}) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const [nnotification,setNotification] = useState(false);
  const [disableButton,setDisableButton] = useState(false);
  
  const acceptInvitation = async () =>{
    setLoading(true);
    try{
      const formData = new FormData()
      formData.append("community_id",notification.communityId);
      formData.append("user_id",userData.id);

      const response = await acceptCommunityInvitation(formData);
      
      setLoading(false);
      if(response.status === 200){
        setNotification({type:'success',message:response.data.message});
        const response2 = await deleteNotification(notification._id);
        setDisableButton(true);
      }
      
    }catch(error){
      setLoading(false)
      console.log(error);
    }
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
              <Button text={"Accept"} loading={loading} disable={disableButton} onClick={(event) => {
                  event.stopPropagation(); 
                  acceptInvitation()
              }}/>
            :null
          }
          {
            nnotification && <Notification kind={nnotification.type} text={nnotification.message} />
          }
        </div>
    </div>
  )
}
