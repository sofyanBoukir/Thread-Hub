import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline'
import testImage from '../../../public/assets/testImage.png'
import { useState } from 'react'
import { Comment } from './Comment'
import { Button } from '../UI/Button'
export const Thread = () => {
    const [handleComments,setHandleComments] = useState(false)
  return (
        <div className='w-[95%] rounded-sm bg-dark px-3 py-2 font-sans'>
            <div className='flex flex-row gap-2'>
                <img src={testImage} className='w-10 h-10 rounded-full'/>
                <div>
                    <h1 className='text-lg font-semibold'>Soufian</h1>
                        <span className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid maiores doloremque dolorum quod pariatur quisquam omnis,
                        impedit, adipisci et quasi dolore natus quis hic non molestias. Hic quod aperiam in?</span>
                </div>
            </div>
            <div className='ml-10 mt-4 flex gap-2 items-center'>
                <HeartIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1}/>
                <ChatBubbleOvalLeftEllipsisIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1} onClick={() => setHandleComments(!handleComments)}/>
                <BookmarkIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1}/>
                <ShareIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1}/>
            </div>      
            <div className='mt-2'>
                <p className={`text-xs font-semibold text-gray-500 ${handleComments?'hidden':null}`}>22 hours ago.</p>
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
