/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import { surgeonNavItems, anesthesiaNavItems, nurseNavItems } from "@/constants";
import { useEffect, useState } from "react";
import { getUserData } from "@/pages/Surgeon/AddPatient/api/getUserData";

interface AppSideBarProps {
  userRole: "admin" | "surgeon" | "anesthesia" | "nurse" | undefined;
  departmentName: string | undefined;
}

export default function AppSideBar({ userRole, departmentName }: AppSideBarProps) {
  const { open } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(userRole);
  const [navItems, setNavItems] = useState<any[]>([]);

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
    if (role === "surgeon") setNavItems(surgeonNavItems);
    else if (role === "anesthesia") setNavItems(anesthesiaNavItems);
    else if (role === "nurse") setNavItems(nurseNavItems);
    else setNavItems([]);
  }, [role]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-row items-center gap-4">
          <div className="bg-light-100 p-2 rounded-full">
            <img src={logo} alt="logo" />
          </div>
          {open && <h1 className="font-semibold text-xl">{departmentName}</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="min-h-[200px] justify-start flex gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    "hover:bg-gray-200 rounded-lg hover:text-black",
                    location.pathname === item.url ? "bg-primary-main text-white" : "",
                    open && "py-1"
                  )}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className={cn(
            "flex flex-row p-1 justify-between hover:bg-gray-200 rounded-lg hover:text-black cursor-pointer",
            open && "p-2"
          )}
        >
          {open && <h1>Logout</h1>}
          <LogOut size={24} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
