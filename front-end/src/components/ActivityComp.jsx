import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "./UI/Button";

export const ActivityComp = ({notification}) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  return (
    <div className='bg-dark rounded-md flex justify-between items-center px-5 py-3 hover:bg-black cursor-pointer duration-200 items-center' onClick={() => navigate(`/avtivity/viewThread/${notification.threadId}`)}>
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
              <Button text={"Accept"} />
            :null
          }
        </div>
    </div>
  )
}
