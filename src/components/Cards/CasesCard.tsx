import React from 'react'
import { Badge } from '../ui/badge'

export default function CasesCard() {
    return (
        <div className='bg-white w-full flex flex-col p-5 rounded-lg gap-5 border-light-100 border-2'>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <p className='font-semibold'>Name</p>
                    <p className='text-primary-main'>
                        Internal Fixation Unit 1
                    </p>
                </div>
                <Badge className='bg-status-pending-red py-[3px]'>
                    PAC Pending
                </Badge>
            </div>
            <p className='text-light-200'>Submitted: 11/10/2024</p>
        </div>
    )
}
