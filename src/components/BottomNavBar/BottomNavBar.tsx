import { anesthesiaBottomNavItems, BottomNavItemsType, nurseBottomNavItems, surgeonBottomNavItems } from '@/constants';
import { getUserData } from '@/pages/Surgeon/AddPatient/api/getUserData';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function BottomNavBar({ userRole }: {
    userRole: "admin" | "surgeon" | "anesthesia" | "nurse" | undefined,
}) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string>('home');
    const [role, setRole] = useState(userRole);
    const [bottomNavItems, setBottomNavItems] = useState<BottomNavItemsType[]>([]);

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');


    const fetchUserRole = async () => {
        if (!username || !token) {
            alert('An error occured. - 6');
            return;

        }
        const loggedInUserDataRespData = await getUserData({ username, token });

        if (loggedInUserDataRespData.success) {
            setRole(loggedInUserDataRespData.data.role);
        }
        else {
            alert('An error occured. - 7');
            return;
        }
    };

    useEffect(() => {
        if (!role) {
            fetchUserRole();
        }
    }, [role]);

    useEffect(() => {
        if (role === "surgeon") setBottomNavItems(surgeonBottomNavItems);
        else if (role === "anesthesia") setBottomNavItems(anesthesiaBottomNavItems);
        else if (role === "nurse") setBottomNavItems(nurseBottomNavItems)
        else setBottomNavItems([]);
    }, [role]);

    return (
        <footer className='bg-white h-16 justify-between items-center flex flex-row p-4 fixed bottom-0 w-full'>
            {
                bottomNavItems.map((item, index) => (
                    <div
                        key={index}
                        className='flex items-center flex-col justify-center cursor-pointer' onClick={() => {
                            setSelected(item.id);
                            navigate(item.url);
                        }}>
                        <item.icon
                            className={cn(
                                selected === item.id ? 'text-primary-main' : ''
                            )}
                        />
                        <p className={cn('text-[12px]',
                            selected === item.id ? "text-primary-main" : ""
                        )}>
                            {item.label}
                        </p>
                    </div>
                ))
            }
        </footer>
    )
}
