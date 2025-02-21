import { AuthCard } from '@/components/AuthCard'
import { PrimaryButton } from '@/components/Button'
import InputComponent from '@/components/Inputs/Input'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-left justify-center gap-16 px-7 border-0 md:border lg:border 2xl:border md:border-primary-main lg:border-primary-main 2xl:border-primary-main p-10 rounded-xl'>
      <h1 className="text-3xl font-semibold text-left">
        Login to your account
      </h1>
      <div className='flex flex-col gap-3'>
        <p className='font-semibold text-xl'>Select your role</p>
        <div className='flex flex-row justify-between items-center my-2 gap-4'>
          <AuthCard />
          <AuthCard />
          <AuthCard />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <InputComponent />
        <InputComponent />
        <PrimaryButton label='Login' className={'mt-10'} onClick={() => navigate('/')}/>
      </div>
    </div>
  )
}