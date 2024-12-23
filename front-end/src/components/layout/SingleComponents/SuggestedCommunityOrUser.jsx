import image from '../../../../public/assets/testImage.png'
export const SuggestedCommunityOrUser = () => {
  return (
    <div className='flex justify-between items-center gap-2 px-5'>
        <div className='flex gap-2 items-center'>
            <div>
                <img src={image} className='h-10 w-10 rounded-full'/>
            </div>
            <div>
                <span className='font-semibold'>Soufian boukir</span><br></br>
                <span className='text-sm font-semibold text-gray-500'>@sof1_boukir</span>
            </div>
        </div>
        <div>
            <button className='bg-blue-600 text-white rounded-md px-3 py-1'>View</button>
        </div>
    </div>
  )
}
