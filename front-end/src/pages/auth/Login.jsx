import { Link } from 'react-router-dom'
import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'
import { Notification } from '../../components/UI/Notification'

export const Login = () => {
  return (
    <div className='bg-dark w-[45%] mx-auto mt-20 px-6 py-8'>
        <div>
            <h1 className='text-3xl font-semibold'>Sign in</h1>
            <p className='font-semibold'>Don't have an account? <Link to={"/signUp"} className='text-blue-500 underline'>Sign up</Link></p>
        </div>
        <form>
            <div className='mt-6 flex flex-col gap-4'>
                <div>
                    <Label text={"Username"} />
                    <Input type={"text"} name={"username"} placeholder={"ex: john001"} />
                </div>
                <div>
                    <Label text={"Password"} />
                    <Input type={"password"} name={"password"} placeholder={"●●●●●●●●●"} />
                    <Link to={'/forgotPassword'} className='text-blue-500 float-right text-sm underline font-semibold'>Forgot password?</Link>
                </div>
                <div className='mt-2'>
                    <Button text={"Sign in"}/>
                </div>
            </div>
        </form>
        {
            <Notification />
        }
    </div>
  )
}
