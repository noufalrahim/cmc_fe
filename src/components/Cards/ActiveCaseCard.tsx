import { Clock } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from '../Button'

export default function ActiveCaseCard() {
  return (
    <div className='bg-white w-full flex flex-col p-5 rounded-lg gap-5 border-light-100 border-2'>
      <div className='flex flex-row justify-between items-center'>
        <div>
        <p>Name</p>
        <p className='text-primary-main'>Desctiptiom</p>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <Clock />
          <p className='text-primary-main'>11:00 AM</p>
        </div>
      </div>
      <div className='flex flex-row w-full gap-5'>
        <SecondaryButton label='Sign In Surgery'/>
        <PrimaryButton label='Open Case' />
      </div>
    </div>
  )
}
