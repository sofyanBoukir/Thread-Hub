import { Link } from 'react-router-dom'
import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'
import { Notification } from '../../components/UI/Notification'
import { useState } from 'react'
import { checkUserLogin } from '../../services/userServices'

export const Login = () => {

    const [formdata,setFormData] = useState({
        email : '',
        password : '',
    });
    const [loading,setLoading] = useState(false);
    const [notification,setNotification] = useState({});

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData((prevState) =>({
            ...prevState,
            [name] : value,
        }));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setNotification(null);
        setLoading(true);
        try {
            const response = await checkUserLogin(formdata);
            setLoading(false);
            if(response.data.loggedIn){
                setNotification({message:"Logged in successfullY",kind:"success"});
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
            <h1 className='text-3xl font-semibold'>Sign in</h1>
            <p className='font-semibold'>Don't have an account? <Link to={"/signUp"} className='text-blue-500 underline'>Sign up</Link></p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='mt-6 flex flex-col gap-4'>
                <div>
                    <Label text={"Email"} />
                    <Input  type={"email"} name={"email"} 
                    value={formdata.email} onChange={handleChange}
                     placeholder={"ex: john00.0@example.com"} />
                </div>
                <div>
                    <Label text={"Password"} />
                    <Input type={"password"} name={"password"}
                    value={formdata.password} onChange={handleChange}
                     placeholder={"●●●●●●●●●"} />
                    <Link to={'/forgotPassword'} className='text-blue-500 float-right text-sm underline font-semibold'>Forgot password?</Link>
                </div>
                <div className='mt-2'>
                    <Button loading={loading} type={'submit'} text={"Sign in"}/>
                </div>
            </div>
            {
                notification && <Notification text={notification.message} kind={notification.kind} />
            }
        </form>
    </div>
  )
}
