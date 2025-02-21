import { cn } from '@/utils/cn';
import { FanIcon, HomeIcon, ListCheck, UserPlus } from 'lucide-react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function BottomNavBar() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string>('home');

    return (
        <footer className='bg-white h-16 justify-between items-center flex flex-row p-4 fixed bottom-0 w-full'>
            <div className='flex items-center flex-col justify-center cursor-pointer' onClick={() => {
                setSelected("home");
                navigate("/");
            }}>
                <HomeIcon
                    className={cn(
                        selected === "home" ? 'text-primary-main' : ''
                    )}
                />
                <p className={cn('text-[12px]', 
                    selected === "home" ? "text-primary-main" : ""
                )}>Home</p>
            </div>
            <div className='flex items-center flex-col justify-center cursor-pointer' onClick={() => {
                setSelected("addUser");
                navigate("/add-user");
            }}>
                <UserPlus
                    className={cn(
                        selected === "addUser" ? 'text-primary-main' : ''
                    )}
                />
                <p className={cn('text-[12px]', 
                    selected === "addUser" ? "text-primary-main" : ""
                )}>Add User</p>
            </div>
            <div className='flex items-center flex-col justify-center cursor-pointer' onClick={() => {
                setSelected("caselist");
                navigate("/caselist");
            }}>
                <ListCheck
                    className={cn(
                        selected === "caselist" ? 'text-primary-main' : ''
                    )}
                />
                <p className={cn('text-[12px]', 
                    selected === "caselist" ? "text-primary-main" : ""
                )}>Case List</p>
            </div>
            <div className='flex items-center flex-col justify-center cursor-pointer' onClick={() => {
                setSelected("theater");
                navigate("/theater");
            }}>
                <FanIcon
                    className={cn(
                        selected === "theater" ? 'text-primary-main' : ''
                    )}
                />
                <p className={cn('text-[12px]', 
                    selected === "theater" ? "text-primary-main" : ""
                )}>Theatre</p>
            </div>
        </footer>
    )
}
