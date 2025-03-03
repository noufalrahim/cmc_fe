import React from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
    search?: {
        value: string;
        setValue: (value: string) => void;
    };
}

export default function Header({ children, title, search }: HeaderProps) {
    return (
        <div className='my-3 gap-5 flex flex-col'>
            <div className='flex flex-row justify-between items-start w-full'>
                <div className='flex items-start flex-col justify-center'>
                    <h1 className='text-2xl font-[500]'>{title}</h1>
                </div>
                <div className='flex justify-center items-center'>
                    {children}
                </div>
            </div>
            {
                search && (
                    <div className="relative w-96">
                        <Input className='border border-primary-main focus:border-primary-main focus:outline-primary-main w-full pl-10' placeholder='Search' value={search.value} onChange={(e) => search.setValue(e.target.value)} />
                        <Search className="absolute left-3 top-2 text-gray-500" size={20} />
                    </div>
                )
            }
        </div>
    );
}
