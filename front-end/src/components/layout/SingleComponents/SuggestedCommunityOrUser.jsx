import { UserPlusIcon } from '@heroicons/react/24/outline'
import image from '../../../../public/assets/testImage.png'
import { useNavigate } from 'react-router-dom'
export const SuggestedCommunityOrUser = ({addMember,user,onAddMember}) => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center gap-2 px-5'>
        <div className='flex gap-2 items-center'>
            <div>
                <img src={user.profile_picture} className='h-10 w-10 rounded-full'/>
            </div>
            <div>
                {
                    !addMember?
                        <>
                            <span className='font-semibold'>{user.full_name}</span><br></br>
                        </>
                    :null
                }
                <span className='text-sm font-semibold text-gray-500'>@{user.username}</span>
            </div>
        </div>
        <div>
            {
                !addMember ?
                    <button className='bg-blue-600 text-white rounded-md px-3 py-1' onClick={() =>navigate(`/search/${user.username}`)}>View</button>
                    :
                    <button className='bg-blue-600 text-white rounded-sm px-2 py-1 flex gap-2' type='button'
                    onClick={() => onAddMember({id:user.id,username:user.username})}>
                        <UserPlusIcon className='w-4 h-4'/>
                    </button>
            }
        </div>
    </div>
  )
}
