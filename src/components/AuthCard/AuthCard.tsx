import React from 'react'
import surgeonImage from "@/assets/surgeon.svg";
import { cn } from '@/utils/cn';

export default function AuthCard() {
    const [isSelected, setIsSelected] = React.useState(false);

    return (
        <div className={cn('cursor-pointer border-primary-main border-2 rounded-xl p-4 items-center flex flex-col text-center gap-2 lg:min-w-[50px] lg:min-h-[50px]',
            isSelected ? 'bg-primary-main text-white' : 'bg-white text-primary-main'
        )}
            onClick={() => setIsSelected(!isSelected)}
        >
            <img src={surgeonImage} alt="My SVG" />
            <p>I'm a surgeon</p>
        </div>
    )
}
