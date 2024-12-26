import { ChatBubbleOvalLeftEllipsisIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import testImage from '../../../public/assets/testImage.png'
import { useState } from 'react'
import { Comment } from './Comment'
import { Button } from '../UI/Button'
import moment from 'moment'
export const Thread = ({thread,edit}) => {
    const [handleComments,setHandleComments] = useState(false)
  return (
        <div className='w-[95%] rounded-sm bg-dark px-3 py-2 font-sans'>
            <div className='flex flex-row gap-2'>
                <img src={testImage} className='w-10 h-10 rounded-full'/>
                <div>
                    <h1 className='text-lg font-semibold'>{thread.user.full_name}</h1>
                        <span className='text-sm'>{thread.title}</span>
                </div>
            </div>
            <div className='ml-10 mt-4 flex gap-2 items-center'>
                <HeartIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1}/>
                <ChatBubbleOvalLeftEllipsisIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1} onClick={() => setHandleComments(!handleComments)}/>
                {
                edit &&  <TrashIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1}/>
                }
                <ShareIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1}/>
            </div>      
            <div className='mt-2'>
                <p className={`text-xs font-semibold text-gray-500 ${handleComments?'hidden':null}`}>{moment(thread.created_at).fromNow()}</p>
            </div>
            {
                handleComments?
                <div className='flex flex-col gap-2 mx-10 mt-4 w-[90%]'>
                    <div className='flex flex-row gap-2 mb-2 items-center'>
                        <input type='text' placeholder='Add a comment' className='bg-dark text-gray-500 px-3 py-2 rounded-md outline-none w-[90%] border-2 border-gray-800'/>
                        <Button text={'Reply'} width={"10%"}/>
                    </div>
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
                :null
            }
        </div>
    ) 
}
