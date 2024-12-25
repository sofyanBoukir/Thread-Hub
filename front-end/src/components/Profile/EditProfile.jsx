import { useState } from 'react';
import { Button } from '../UI/Button'
import { Label } from '../UI/Label'
import { editProfile } from '../../services/profileServices';
import { Notification } from '../UI/Notification';
export const EditProfile = () => {

  const userData = JSON.parse(localStorage.getItem("user"));
  const [formdata,setFormData] = useState({
    full_name : userData.full_name,
    username : userData.username ? userData.username : 'not setted yet',
    bio : userData.bio ,
  })
  const [loading,setLoading] = useState(false);
  const [image,setImage] = useState(null);
  const [notification,setNotification] = useState({});
  const handleImageChange = (e) =>{
    setImage(e.target.files[0]);
  }

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData((prevState) =>({
      ...prevState,
      [name] : value,
    }));
  }
  

  const handleSubmit = async (e) =>{ 
    e.preventDefault();
    setLoading(true);
    setNotification(null);
    try{
        const formData = new FormData();
        formData.append("full_name",formdata.full_name)
        formData.append("username",formdata.username)
        formData.append("bio",formdata.bio)
        if(image !==  null){
            formData.append("image",image);
        }
        const response = await editProfile(formData,localStorage.getItem("token"));
        setLoading(false);
        
        if(response.data.updated){
            localStorage.setItem("user",JSON.stringify(response.data.user));
            setNotification({kind:"success",message:"Profile Updated succesfully!"});
        }
    }catch(error){
        setLoading(false);
        if(error.response && error.response.data.message){
            setNotification({kind:"error",message:error.response.data.message});
        }else{
            setNotification({kind:"error",message:"Try again later!"});
        }
    }
  }
  return (
    <div>
        <div>
            <h1 className="text-2xl font-semibold">Edit profile</h1>
            <span className="text-gray-300">Make any changes</span>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="flex gap-2 items-center mt-8">
                <div>
                    <img src={userData.profile_picture} alt="profile" className="w-20 h-20 rounded-full"/>
                </div>
                <div>
                    <input type='file' id='image' accept='image/png,image/jpeg,image/jpg' className='hidden' onChange={handleImageChange}/>
                    <label htmlFor='image' className='text-blue-500 font-semibold pr-5 cursor-pointer'>Choose file</label>
                    <span>Only images jpg,png,jpeg. maximum 2MB</span>
                </div>
            </div>
            <div className="mt-5 flex flex-col gap-5">
                <div>
                    <Label text='Full name'/>
                    <input type="text" className="px-3 py-2 text-gray-500 bg-dark rounded-md outline-none w-[100%] mt-3 border-2 border-gray-800"
                    placeholder={formdata.full_name} name='full_name' onChange={handleChange}/>
                </div>
                <div>
                    <Label text='Username'/>
                    <input type="text" className="px-3 py-2 text-gray-500 bg-dark rounded-md outline-none w-[100%] mt-3 border-2 border-gray-800"
                    placeholder={formdata.username} name='username' onChange={handleChange}/>
                </div>
                <div>
                    <Label text='Bio'/>
                    <textarea value={formdata.bio} className="px-3 py-2 text-gray-500 bg-dark rounded-md outline-none w-[100%] border-2 border-gray-800 h-20 resize-none"
                    name='bio' onChange={handleChange}>No bio yet</textarea>
                </div>
                <div>
                    <Button text={"Save changes"} loading={loading}/>
                </div>
                {
                    notification && <Notification text={notification.message} kind={notification.kind} />
                }
            </div>
        </form>
    </div>
  )
}
