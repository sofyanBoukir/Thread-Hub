import { ArrowLeftStartOnRectangleIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PencilSquareIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline"
import { SinglePage } from "./SingleComponents/SinglePage"

export const LeftBar = () => {
  return (
    <div className="bg-dark w-[18%] pt-14 lg:flex hidden flex-col gap-2 h-screen fixed">
        <SinglePage svg={<HomeIcon className="h-8 w-8" />} link={'/'} text={'Home'}/>
        <SinglePage svg={<MagnifyingGlassIcon className="h-8 w-8" />} link={'/search'} text={'Search'}/>
        <SinglePage svg={<HeartIcon className="h-8 w-8" />} link={'/activity'} text={'Activity'}/>
        <SinglePage svg={<PencilSquareIcon className="h-8 w-8" />} link={'/createThread'} text={'Create thread'}/>
        <SinglePage svg={<UserGroupIcon className="h-8 w-8" />} link={'/communities'} text={'Communities'}/>
        <SinglePage svg={<UserIcon className="h-8 w-8" />} link={'/profile'} text={'Profile'}/>
        <div className="flex gap-3 items-center px-5 py-2 fixed bottom-2 w-full cursor-pointer">
            <ArrowLeftStartOnRectangleIcon className="h-8 w-8" />
            <span className="text-lg ">Logout</span>
        </div>
    </div>
  )
}
