import React from 'react'
import { Button } from '../ui/button'
interface SecondaryButtonProps {
    label: string
    startIcon?: React.ReactNode;
};

export default function SecondaryButton({ label, startIcon }: SecondaryButtonProps) {
    return (
        <Button variant={'outline'} className='w-full text-primary-main border-primary-main hover:bg-primary-main hover:text-white'>
            {startIcon && startIcon}
            {label}
        </Button>
    )
}
