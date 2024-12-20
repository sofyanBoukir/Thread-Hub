import { ArrowLeftStartOnRectangleIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PencilSquareIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline"
import { SinglePage } from "./SinglePage"

export const RightBar = () => {
  return (
    <div className="bg-dark w-[100%] pt-14 flex flex-col gap-2 h-screen">
        <SinglePage svg={<HomeIcon className="h-8 w-8" />} link={'/'} text={'Home'}/>
        <SinglePage svg={<MagnifyingGlassIcon className="h-8 w-8" />} link={'/search'} text={'Search'}/>
        <SinglePage svg={<HeartIcon className="h-8 w-8" />} link={'/activity'} text={'Activity'}/>
        <SinglePage svg={<PencilSquareIcon className="h-8 w-8" />} link={'/createThread'} text={'Create thread'}/>
        <SinglePage svg={<UserGroupIcon className="h-8 w-8" />} link={'/communities'} text={'Communities'}/>
        <SinglePage svg={<UserIcon className="h-8 w-8" />} link={'/profile'} text={'Profile'}/>
    </div>
  )
}
