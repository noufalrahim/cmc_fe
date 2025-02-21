import React from 'react'

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
};

export default function Header({ children, title }: HeaderProps) {
    return (
        <div className='my-3 flex flex-row justify-between w-full max-h-10'>
            <div className='flex items-center'>
                <h1 className='text-2xl font-[500]'>{title}</h1>
            </div>
            <div className='flex jsutify-center items-center'>
                {children}
            </div>
        </div>
    )
}
