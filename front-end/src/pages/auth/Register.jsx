import { Link, Navigate } from 'react-router-dom'
import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'
import { useState } from 'react'
import { userRegister } from '../../services/userServices'
import { Notification } from '../../components/UI/Notification'
import { Verification } from './Verification'

export const Register = () => {
    const [formdata,setFormData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        r_password : '',
    });
    const [loading,setLoading] = useState(false);
    const [notification,setNotification] = useState({});
    const [verificationCodeSent,setVerificationSent] = useState(false);

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
        if(formdata.password !== formdata.r_password){
            setNotification({message:"Passwords not match",kind:"error"})
            setLoading(false)
            return;
        }
        try {
            const response = await userRegister(formdata);
            setLoading(false);
            if(response.data.sended){
                setVerificationSent(true);   
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
        {
            !verificationCodeSent ?
                    <>
                        <div>
                                <h1 className='text-3xl font-semibold'>Sign up</h1>
                                <p className='font-semibold'>Already have an account? <Link to={"/"} className='text-blue-500 underline'>Sign in</Link></p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='mt-6 flex flex-col gap-4'>
                                    <div className='flex justify-between'>
                                        <div className='w-[48%]'>
                                            <Label text={"First name"} />
                                            <Input  type={"text"} name={"firstName"} placeholder={"ex: john"} 
                                            value={formdata.firstName} onChange={handleChange}/>
                                        </div>
                                        <div className='w-[48%]'>
                                            <Label text={"Last name"} />
                                            <Input type={"text"} name={"lastName"} placeholder={"ex: doe"} 
                                            value={formdata.lastName} onChange={handleChange}/>
                                        </div>
                                    </div>  
                                    <div>
                                        <Label text={"Email"} />
                                        <Input type={"email"} name={"email"} placeholder={"ex: john.example@gmail"} 
                                        value={formdata.email} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <Label text={"Password"} />
                                        <Input type={"password"} name={"password"} placeholder={"●●●●●●●●●"} 
                                        value={formdata.password} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <Label text={"Retype Password"} />
                                        <Input type={"password"} name={"r_password"} placeholder={"●●●●●●●●●"} 
                                        value={formdata.r_password} onChange={handleChange}/>
                                    </div>
                                    <div className='mt-2'>
                                        <Button type={'submit'} loading={loading} text={"Sign up"}/>
                                    </div>
                                </div>
                            </form>
                            {
                                notification && <Notification text={notification.message} kind={notification.kind} />
                            }
                            {
                                verificationCodeSent && <Navigate to={"/verification"} />
                            }
                    </>
            :
            <Verification formdata={formdata} />
        }
    </div>
  )
}
