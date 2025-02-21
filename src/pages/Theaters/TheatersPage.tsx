import { OtCard } from '@/components/Cards'
import { Header } from '@/components/Header'
import React from 'react'

export default function TheatersPage() {
  return (
    <div className='flex flex-grow flex-col w-full py-5 gap-5'>
      <Header title='Operation Theaters'/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OtCard />
        <OtCard />
        <OtCard />
        <OtCard />  
      </div>
    </div>
  )
}
