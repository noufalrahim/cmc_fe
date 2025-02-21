import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import logo from "@/assets/logo.png";

export default function AppBar() {
  return (
    <div className='bg-white flex flex-row justify-between items-center p-4'>
      <div className='flex flex-row items-center gap-4'>
        <div className='bg-light-100 p-2 rounded-full'>
          <img src={logo} alt="logo" />
        </div>
        <h1 className='font-semibold text-xl'>
          Orthopedics
        </h1>
      </div>
      <IoLogOutOutline size={24}/>
    </div>
  )
}
