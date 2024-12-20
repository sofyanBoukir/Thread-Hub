import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'
import { useState } from 'react'
import { verifyCode } from '../../services/userServices'
import { useNavigate } from 'react-router-dom'
import { Notification } from '../../components/UI/Notification'
import { LinearProgress } from '@mui/material'

export const Verification = ({formdata}) => {

    const [verificationCode, setVerificationCode] = useState("");
    const [newFormdata, setNewFormData] = useState({ ...formdata, verificationCode });
    const [loading,setLoading] = useState(false);
    const [notification,setNotification] = useState({});
    const [registred,setRegistred] = useState(false);
    const navigate = useNavigate();

    const handleVerificationCodeChange = (e) => {
        const code = e.target.value;
        setVerificationCode(code);

        setNewFormData((prevData) => ({
            ...prevData,
            verificationCode: code,
        }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setNotification(null);
        setLoading(true);
        try {
            setLoading(true);
            const response = await verifyCode(newFormdata);
            setLoading(false);
            if(response.data.registred){
                setRegistred(true);
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
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
    <div className='bg-dark w-[100%] mx-auto px-6 py-8'>
        <div>
            <h1 className='text-3xl font-semibold'>Verification code</h1>
            <p className='font-semibold'>A verification code sent to <span className='text-blue-500'>{formdata.email}</span></p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='mt-6 flex flex-col gap-4'>
                <div>
                    <Label text={"Verification code"} />
                    <Input type={"number"} name={"verificationCode"} placeholder={"max: 6 chars"} 
                    value={verificationCode} onChange={handleVerificationCodeChange}/>
                </div>
                <div className='mt-2'>
                    <Button text={"Register"} type={'submit'} loading={loading}/>
                </div>
            </div>
        </form>
        {
            notification && <Notification text={notification.message} kind={notification.kind} />
        }
        {
            registred ?
            <div className='text-center mt-5'>
                <span className='text-xl font-semibold'>Success! redirecting to login</span>
                <LinearProgress />
            </div> :null
        }
    </div>
  )
}
