import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'
import { useState } from 'react'
import { sendResetPasswordLink } from '../../services/userServices'
import { Notification } from '../../components/UI/Notification'

export const ForgotPassword = () => {
    const [formdata,setFormData] = useState({
        email:'',
    })
    const [loading,setLoading] = useState(false);
    const [notification,setNotification] = useState({});

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData((prevState) =>({
            ...prevState,
            [name] : value
        }))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        setNotification(null);
        try {
            const response = await sendResetPasswordLink(formdata);
            setLoading(false);
            if(response.data.sended){
                setNotification({message:response.data.message,kind:"success"});
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
    <div className='bg-dark w-[90%] md:w-[45%] mx-auto mt-20 px-6 py-8'>
        <div>
            <h1 className='text-3xl font-semibold'>Forgot password</h1>
            <p className='font-semibold'>Enter the email associed with your account!</p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='mt-6 flex flex-col gap-4'>
                <div>
                    <Label text={"Email"} />
                    <Input type={"email"} name={"email"} placeholder={"ex: john001.example@gmail.com"}
                    value={formdata.email} onChange={handleChange}/>
                </div>
                <div className='mt-2'>
                    <Button text={"Reset it"} type={'submit'} loading={loading}/>
                </div>
            </div>
        </form>
        {
            notification && <Notification text={notification.message} kind={notification.kind} />
        }
    </div>
  )
}
