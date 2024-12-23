import imageTest from '../../public/assets/testImage.png'
export const ActivityComp = () => {
  return (
    <div className='bg-dark rounded-md px-5 py-3 flex gap-3 hover:bg-black cursor-pointer duration-200 items-center'>
        <img src={imageTest} className='h-8 w-8 rounded-full'/>
        <p className='font-semibold'><span className="text-blue-400">soufian </span>replied to your comment!</p>
    </div>
  )
}
