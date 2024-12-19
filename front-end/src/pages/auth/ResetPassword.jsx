import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { resetPassword } from '../../services/userServices';
import { Notification } from '../../components/UI/Notification';

export const ResetPassword = () => {
    const {token} = useParams();

    const location = useLocation();
    const emailSearch = new URLSearchParams(location.search);
    const email = emailSearch.get("email");
    const [loading,setLoading] = useState(false);
    const [notification,setNotification] = useState({});

    const [formData,setFormData] = useState({
        email : email,
        password : '',
        retype_password : '',
        token : token,
    })

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData((prevState)=>({
        ...prevState,
        [name] : value,
        }))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setNotification(null);
        if(formData.password !== formData.retype_password){
            return
        }   
        try {
            setLoading(true);
            const response = await resetPassword(formData);
            setLoading(false);
            console.log(response);
            
            if(response.data.reseted){
                setNotification({message:response.data.message,kind:"success"})

            }
        } catch (error) {
            setLoading(false)
            if(error.response && error.response.data.message){
                setNotification({message:error.response.data.message,kind:"error"})
            }else{
                setNotification({message:"Try again later",kind:"error"})   
            }
        }
    }
  return (
    <div className='bg-dark w-[45%] mx-auto mt-20 px-6 py-8'>
        <div>
            <h1 className='text-3xl font-semibold'>Reset your password</h1>
            <p className='font-semibold'>Complete this credentials to reset your password</p>
            <Link className="font-semibold text-blue-500 underline" to={"/"}>Back to Login</Link>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='mt-6 flex flex-col gap-4'>
                <div>
                    <Label text={"Password"} />
                    <Input type={"password"} name={"password"} placeholder={"●●●●●●●●●"} 
                    value={formData.password} onChange={handleChange}/>
                </div>
                <div>
                    <Label text={"Retype Password"} />
                    <Input type={"password"} name={"retype_password"} placeholder={"●●●●●●●●●"}
                    value={formData.retype_password} onChange={handleChange}/>
                </div>
                <div className='mt-2'>
                    <Button text={"Reset password"} type={'submit'} loading={loading}/>
                </div>
            </div>
        </form>
        {
            notification && <Notification text={notification.message} kind={notification.kind} />
        }
    </div>
  )
}
