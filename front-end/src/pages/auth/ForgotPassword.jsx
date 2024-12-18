import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'

export const ForgotPassword = () => {
  return (
    <div className='bg-dark w-[45%] mx-auto mt-20 px-6 py-8'>
        <div>
            <h1 className='text-3xl font-semibold'>Forgot password</h1>
            <p className='font-semibold'>Enter the email associed with your account!</p>
        </div>
        <form>
            <div className='mt-6 flex flex-col gap-4'>
                <div>
                    <Label text={"Email"} />
                    <Input type={"email"} name={"email"} placeholder={"ex: john001.example@gmail.com"} />
                </div>
                <div className='mt-2'>
                    <Button text={"Reset it"}/>
                </div>
            </div>
        </form>
    </div>
  )
}
