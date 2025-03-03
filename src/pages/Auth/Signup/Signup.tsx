/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthCard } from '@/components/AuthCard'
import { PrimaryButton } from '@/components/Button'
import InputComponent from '@/components/Inputs/Input'
import { useNavigate } from "react-router-dom";
import surgeonImage from "@/assets/surgeon.svg";
import NurseImage from "@/assets/nurse.svg";
import AnesthesiaImage from "@/assets/anesthesia.svg";
import { useState } from 'react';
import { login, ResponseType } from '../api/Login';

interface LoginProps {
  setUserRole: (role: "surgeon" | "admin" | "nurse" | "anesthesia" | undefined) => void;
  userRole: "surgeon" | "admin" | "nurse" | "anesthesia";
};

export default function Signup({
  setUserRole,
  userRole,
}: LoginProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    setIsLoading(true);
    const response: ResponseType = await login({
      username: username,
      password: password,
      role: userRole
    });

    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/');
    }
    else {
      alert('Failed to login. Invalid Credentials');
    }
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col items-left justify-center gap-16 px-7 border-0 md:border lg:border 2xl:border md:border-primary-main lg:border-primary-main 2xl:border-primary-main p-10 rounded-xl'>
      <h1 className="text-3xl font-semibold text-left">
        Login to your account
      </h1>
      <div className='flex flex-col gap-3'>
        <p className='font-semibold text-xl'>Select your role</p>
        <div className='grid grid-cols-3 gap-2 w-full'>
          <AuthCard
            text='Iam a Surgeon'
            image={surgeonImage}
            selected={userRole}
            setSelected={() => setUserRole('surgeon')}
            type='surgeon'
          />
          <AuthCard
            text='Iam an Anesthesiologist'
            image={AnesthesiaImage}
            selected={userRole}
            setSelected={() => setUserRole('anesthesia')}
            type='anesthesia'
          />
          <AuthCard
            text='Iam a Nurse'
            image={NurseImage}
            selected={userRole}
            setSelected={() => setUserRole('nurse')}
            type='nurse'
          />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <InputComponent value={username} onChange={(e: any) => setUsername(e.target.value)} placeholder={'Username'} />
        <InputComponent value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder={'Password'} />
        <PrimaryButton label='Login' className={'mt-10'} onClick={handleLogin} loading={isLoading} />
      </div>
    </div>
  )
}