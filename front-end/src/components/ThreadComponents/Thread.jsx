import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline'
import testImage from '../../../public/assets/testImage.png'
export const Thread = () => {
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
                <ChatBubbleOvalLeftEllipsisIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1}/>
                <BookmarkIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1}/>
                <ShareIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1}/>
            </div>      
            <div className='mt-2'>
                <p className='text-xs font-semibold text-gray-500'>22 hours ago.</p>
            </div>
        </div>
    ) 
}
