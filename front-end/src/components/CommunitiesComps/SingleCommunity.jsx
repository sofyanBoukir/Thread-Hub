import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import communityImage from '../../../public/assets/communityDefaultImage.png'   
import imageTest from '../../../public/assets/testImage.png'
import { Button } from '../UI/Button'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
export const SingleCommunity = ({community,handleEditCommunity,setHandleEditCommunity}) => {
    const navigate = useNavigate();
  return (
    <div className='bg-dark w-[100%] lg:w-[48%] rounded-sm px-4 py-2'>
        <div className="flex flex-row gap-2 items-center justify-between">
            <div className='flex flex-row gap-2 items-center'>
                <div>
                    <img src={community.picture} className="w-10 h-10 rounded-md" />
                </div>
                <div>
                    <p className="font-semibold">{community.description?community.description.substr(0,20):null}</p>
                    <span className="text-gray-500 font-semibold pr-5 cursor-pointer">Created {moment(community.created_at).fromNow()}</span>
                </div>
            </div>
            <div>
                <Cog6ToothIcon className='w-6 h-6 text-blue-400 cursor-pointer hover:text-blue-600 duration-200'
                onClick={() => setHandleEditCommunity(true)}/>
            </div>
        </div>
        <div className='mt-5 flex justify-between'>
            <Button text='View' width='w-[20%]' bg={'bg-blue-500'} onClick={() => navigate(`/communities/community/${community.id}`)}/>
            <div className="flex -space-x-4 rtl:space-x-reverse">
                <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src={imageTest} alt="" />
                <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src={communityImage} alt="" />
                <img className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src={communityImage} alt="" />
            </div>
        </div>
    </div>
  )
}
