import { Link } from 'react-router-dom'
import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'

export const Register = () => {
  return (
    <div className='bg-dark w-[45%] mx-auto mt-20 px-6 py-8'>
        <div>
            <h1 className='text-3xl font-semibold'>Sign up</h1>
            <p className='font-semibold'>Already have an account? <Link to={"/"} className='text-blue-500 underline'>Sign in</Link></p>
        </div>
        <form>
            <div className='mt-6 flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <div className='w-[48%]'>
                        <Label text={"First name"} />
                        <Input type={"text"} name={"username"} placeholder={"ex: john"} />
                    </div>
                    <div className='w-[48%]'>
                        <Label text={"Last name"} />
                        <Input type={"text"} name={"username"} placeholder={"ex: doe"} />
                    </div>
                </div>  
                <div>
                    <Label text={"Email"} />
                    <Input type={"email"} name={"email"} placeholder={"ex: john.example@gmail"} />
                </div>
                <div>
                    <Label text={"Password"} />
                    <Input type={"password"} name={"password"} placeholder={"●●●●●●●●●"} />
                </div>
                <div>
                    <Label text={"Retype Password"} />
                    <Input type={"password"} name={"password"} placeholder={"●●●●●●●●●"} />
                </div>
                <div className='mt-2'>
                    <Button text={"Sign up"}/>
                </div>
            </div>
        </form>
    </div>
  )
}
