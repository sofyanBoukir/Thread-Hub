import imageTest from '../../../public/assets/testImage.png'
import { Button } from '../UI/Button'
import { Label } from '../UI/Label'
export const EditProfile = () => {
  return (
    <div>
        <div>
            <h1 className="text-2xl font-semibold">Edit profile</h1>
            <span className="text-gray-300">Make any changes</span>
        </div>
        <div className="flex gap-2 items-center mt-8">
            <div>
                <img src={imageTest} alt="profile" className="w-20 h-20 rounded-full"/>
            </div>
            <div>
                <input type='file' id='image' accept='image/png,image/jpeg' className='hidden'/>
                <label htmlFor='image' className='text-blue-500 font-semibold pr-5 cursor-pointer'>Choose file</label>
                <span>Only images png,jpeg</span>
            </div>
        </div>
        <div className="mt-5 flex flex-col gap-5">
            <div>
                <Label text='Full name'/>
                <input type="text" className="px-3 py-2 text-gray-500 bg-dark rounded-md outline-none w-[100%] mt-3 border-2 border-gray-800"
                placeholder="Soufian boukir"/>
            </div>
            <div>
                <Label text='Username'/>
                <input type="text" className="px-3 py-2 text-gray-500 bg-dark rounded-md outline-none w-[100%] mt-3 border-2 border-gray-800"
                placeholder="Soufian boukir"/>
            </div>
            <div>
                <Label text='Bio'/>
                <textarea value={'this is the bio'} className="px-3 py-2 text-gray-500 bg-dark rounded-md outline-none w-[100%] border-2 border-gray-800 h-20 resize-none"></textarea>
            </div>
            <div>
                <Button text={"Save changes"}/>
            </div>
        </div>
    </div>
  )
}
