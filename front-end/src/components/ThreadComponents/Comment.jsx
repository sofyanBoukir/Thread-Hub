import imageTest from '../../../public/assets/testImage.png'
export const Comment = () => {
  return (
    <div className='flex flex-row gap-2'>
        <img src={imageTest} className='w-6 h-6 rounded-full'/>
      <div>
        <h1 className='text-md font-semibold'>Soufian boukir</h1>
        <span className='font-semibold text-gray-500 text-xs'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur saepe deserunt voluptatum odit repellendus autem illo earum iusto nam. Laboriosam corporis non eligendi, nam unde exercitationem iste odio nihil quidem.</span>
      </div>
    </div>
  )
}
