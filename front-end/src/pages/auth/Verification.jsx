import { Label } from '../../components/UI/Label'
import { Input } from '../../components/UI/Input'
import { Button } from '../../components/UI/Button'

export const Verification = () => {
  return (
    <div className='bg-dark w-[45%] mx-auto mt-20 px-6 py-8'>
        <div>
            <h1 className='text-3xl font-semibold'>Verification code</h1>
            <p className='font-semibold'>A verification code sent to <span className='text-blue-500'>soufianeboukir0@gmail.com</span></p>
        </div>
        <form>
            <div className='mt-6 flex flex-col gap-4'>
                <div>
                    <Label text={"Verification code"} />
                    <Input type={"password"} name={"password"} placeholder={"max: 6 chars"} />
                </div>
                <div className='mt-2'>
                    <Button text={"Register"}/>
                </div>
            </div>
        </form>
    </div>
  )
}
