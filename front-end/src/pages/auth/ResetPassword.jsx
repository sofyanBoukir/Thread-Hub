import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'

export const ResetPassword = () => {
  return (
    <div className='bg-dark w-[45%] mx-auto mt-20 px-6 py-8'>
        <div>
            <h1 className='text-3xl font-semibold'>Reset password</h1>
            <p className='font-semibold'>Complete this credentials to reset your password</p>
        </div>
        <form>
            <div className='mt-6 flex flex-col gap-4'>
                <div>
                    <Label text={"Password"} />
                    <Input type={"password"} name={"password"} placeholder={"●●●●●●●●●"} />
                </div>
                <div>
                    <Label text={"Retype Password"} />
                    <Input type={"password"} name={"password"} placeholder={"●●●●●●●●●"} />
                </div>
                <div className='mt-2'>
                    <Button text={"Reset password"}/>
                </div>
            </div>
        </form>
    </div>
  )
}
