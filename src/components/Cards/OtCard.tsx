import React from 'react'
import { Fan } from "lucide-react";
import { Badge } from '../ui/badge';

export default function OtCard() {
  return (
    <div className='border-light-100 border-2 flex flex-row items-center justify-between p-5 rounded-xl bg-white'>
        <div className='flex flex-row gap-3 items-center justify-center'>
            <Fan size={24}/>
            <p className='font-semibold text-xl'>OT 1</p>
        </div>
        <Badge className='bg-status-success hover:bg-status-success/90'>Available</Badge>
    </div>
  )
}
