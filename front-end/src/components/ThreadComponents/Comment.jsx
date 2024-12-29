import { TrashIcon } from "@heroicons/react/16/solid"

export const Comment = ({comment,deleteComment}) => {
  const userData = JSON.parse(localStorage.getItem("user"))
  return (
    <div className='flex flex-row w-[100%]'>
        <div className="flex flex-row gap-1 w-[100%]">
            <img src={comment.posterProfile} className='w-6 h-6 rounded-full'/>
          <div className="rounded-lg border-2 rounded-tl-none border-gray-600 px-2 py-1 w-[100%] flex justify-between mt-4">
            <div>
              <h1 className='text-sm font-semibold'>{comment.posterUsername}</h1>
              <span className='font-semibold text-gray-500 text-sm'>{comment.content}</span>
            </div>
            {
              userData.username === comment.posterUsername ?
                <div className="float-right">
                  <TrashIcon className='h-6 w-6 text-red-500 cursor-pointer' onClick={() => deleteComment(comment._id)}/>
                </div>
                :null
            }
          </div>
        </div>
        
    </div>
  )
}
