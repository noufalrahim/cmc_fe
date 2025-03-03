import { AppBar } from '@/components/AppBar';
import { BottomNavBar } from '@/components/BottomNavBar';
import { useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSideBar } from "@/components/AppSideBar"
import { useIsMobile } from '@/hooks/use-mobile';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from 'lucide-react';
import PulsatingDot from '@/components/StatusDotIndicator/StatusDotIndicator';
import { getUserData } from '@/pages/Surgeon/AddPatient/api/getUserData';
import { useEffect, useState } from 'react';
import { UserType } from '@/pages/Surgeon/AddPatient/types';

interface LayoutProps {
    userRole: "admin" | "surgeon" | "anesthesia" | "nurse" | undefined;
    children?: React.ReactNode;
};

export default function Layout({ children, userRole }: LayoutProps) {

    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const [userData, setUserData] = useState<UserType>();

    const isMobileView = useIsMobile();

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    const fetchLoggedInUserData = async () => {
        if(!username || !token) {
            return;
        }

        const loggedInUser = await getUserData({username, token}); 
        if(loggedInUser.success) {
            setUserData(loggedInUser.data);
        }
        else{
            alert('An error occured - 15');
        }
    };

    useEffect(() => {
        fetchLoggedInUserData();
    }, []);

    return (
        <>
            {
                isMobileView ? (
                    <div className='min-h-screen w-full flex flex-col'>
                        {!isLoginPage && <AppBar departmentName={userData?.department?.departmentName}/>}
                        <div className='flex-grow flex px-5 pb-20 bg-secondary-main'>
                            {children}
                        </div>
                        {!isLoginPage && <BottomNavBar userRole={userRole} />}
                    </div>
                ) : (
                    <SidebarProvider>
                        <AppSideBar userRole={userRole} departmentName={userData?.department?.departmentName}/>
                        <main className='w-full px-5 bg-secondary-main pb-20 relative'>
                            <SidebarTrigger />
                            {children}
                            <div className='absolute right-5 bottom-2'>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <InfoIcon fill='' stroke='white' size={25} className='text-primary-main' />
                                        </TooltipTrigger>
                                        <TooltipContent className='mx-5 bg-light-100 text-black border border-2 border-primary-main p-5 gap-5 flex flex-col'>
                                            <div className='w-full flex flex-row justify-between items-center gap-5'>
                                                <PulsatingDot color='bg-orange-500' size={10} />
                                                <p>Pending</p>
                                            </div>
                                            <div className='w-full flex flex-row justify-between items-center gap-5'>
                                                <PulsatingDot color='bg-blue-500' size={10} />
                                                <p>Scheduled</p>
                                            </div>
                                            <div className='w-full flex flex-row justify-between items-center gap-5'>
                                                <PulsatingDot color='bg-indigo-500' size={10} />
                                                <p>Ongoing</p>
                                            </div>
                                            <div className='w-full flex flex-row justify-between items-center gap-5'>
                                                <PulsatingDot color='bg-green-700' size={10} />
                                                <p>Completed</p>
                                            </div>
                                            <div className='w-full flex flex-row justify-between items-center gap-5'>
                                                <PulsatingDot color='bg-black' size={10} />
                                                <p>Unknown</p>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </main>
                    </SidebarProvider>
                )
            }
        </>
    )
}
