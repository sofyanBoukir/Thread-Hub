import { ArrowLeftStartOnRectangleIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PencilSquareIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom";

export const BottomBar = () => {
    const navigate = useNavigate();
    const location = window.location.pathname;
  return (
    <div className="flex gap-2 fixed bottom-0 justify-between w-full bg-dark py-2 px-3">
        <HomeIcon onClick={() => navigate("/")} className={`h-10 w-10 ${location === '/' ? 'bg-blue-700': null }  px-2 rounded-md`}/> 
        <MagnifyingGlassIcon onClick={() => navigate("/search")} className={`h-10 w-10 ${location === '/search' ? 'bg-blue-700': null }  px-2 rounded-md`}/>
        <HeartIcon onClick={() => navigate("/activity")} className={`h-10 w-10 ${location === '/activity' ? 'bg-blue-700': null }  px-2 rounded-md`}/>
        <PencilSquareIcon onClick={() => navigate("createThread")} className={`h-10 w-10 ${location === '/createThread' ? 'bg-blue-700': null }  px-2 rounded-md`}/>
        <UserGroupIcon onClick={() => navigate("/communities")} className={`h-10 w-10 ${location === '/communities' ? 'bg-blue-700': null }  px-2 rounded-md`}/>
        <UserIcon onClick={() => navigate("/profile")} className={`h-10 w-10 ${location === '/profile' ? 'bg-blue-700': null }  px-2 rounded-md`}/>
        <ArrowLeftStartOnRectangleIcon onClick={() => navigate("")} className="h-10 w-10 px-2 rounded-md"/>
    </div>
  )
}
