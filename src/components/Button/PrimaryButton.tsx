import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/utils/cn'

interface PrimaryButtonProps {
    label: string,
    className?: string,
    onClick?: () => void;
}

export default function PrimaryButton({ label, className, onClick}: PrimaryButtonProps) {
    return (
        <Button variant={'default'} className={cn('w-full bg-primary-main hover:bg-primary-main/80 py-5', className)} onClick={onClick}>
            {label}
        </Button>
    )
}
