import React from 'react'
import { cn } from '@/utils/cn';

interface AuthCardProps {
    text: string;
    image: string;
    selected: string;
    setSelected: () => void;
    type: string;
};

export default function AuthCard({
    image,
    text,
    selected,
    setSelected,
    type
}: AuthCardProps) {

    return (
        <div className={cn('cursor-pointer border-primary-main border-2 rounded-xl p-4 items-center flex flex-col text-center gap-2',
            selected === type ? 'bg-primary-main text-white' : 'bg-white text-primary-main'
        )}
            onClick={setSelected}
        >
            <img src={image} alt="My SVG" />
            <p className='max-w-20 break-words line-clamp-2'>{text}</p>
        </div>
    )
}
