import { AppBar } from '@/components/AppBar';
import { BottomNavBar } from '@/components/BottomNavBar';
import {  useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSideBar } from "@/components/AppSideBar"
import { useIsMobile } from '@/hooks/use-mobile';

export default function Layout({ children }: { children?: React.ReactNode }) {

    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    const isMobileView = useIsMobile();
    
    return (
        <>
            {
                isMobileView ? (
                    <div className='min-h-screen w-full flex flex-col'>
                        {!isLoginPage && <AppBar />}
                        <div className='flex-grow flex px-5 pb-20 bg-secondary-main'>
                            {children}
                        </div>
                        {!isLoginPage && <BottomNavBar />}
                    </div>
                ) : (
                    <SidebarProvider>
                        <AppSideBar />
                        <main className='w-full px-5 bg-secondary-main'>
                            <SidebarTrigger />
                            {children}
                        </main>
                    </SidebarProvider>
                )
            }
        </>
    )
}
