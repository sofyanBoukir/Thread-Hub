import { UserPlusIcon } from '@heroicons/react/24/outline'
import image from '../../../../public/assets/testImage.png'
export const SuggestedCommunityOrUser = ({addMember}) => {
  return (
    <div className='flex justify-between items-center gap-2 px-5'>
        <div className='flex gap-2 items-center'>
            <div>
                <img src={image} className='h-10 w-10 rounded-full'/>
            </div>
            <div>
                {
                    !addMember?
                        <>
                            <span className='font-semibold'>Soufian boukir</span><br></br>
                        </>
                    :null
                }
                <span className='text-sm font-semibold text-gray-500'>@sof1_boukir</span>
            </div>
        </div>
        <div>
            {
                !addMember ?
                    <button className='bg-blue-600 text-white rounded-md px-3 py-1'>View</button>
                    :
                    <button className='bg-blue-600 text-white rounded-sm px-2 py-1 flex gap-2'>
                        <UserPlusIcon className='w-4 h-4'/>
                    </button>
            }
        </div>
    </div>
  )
}
