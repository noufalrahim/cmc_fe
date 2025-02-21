import { FanIcon, Home, ListCheck, LogOut, UserPlus } from "lucide-react";
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
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/utils/cn";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Add User",
    url: "/add-user",
    icon: UserPlus,
  },
  {
    title: "Case List",
    url: "/caselist",
    icon: ListCheck,
  },
  {
    title: "Theatre",
    url: "/theater",
    icon: FanIcon,
  }
];

export default function AppSideBar() {
  const { open } = useSidebar();
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-row items-center gap-4">
          <div className="bg-light-100 p-2 rounded-full">
            <img src={logo} alt="logo" />
          </div>
          {open && <h1 className="font-semibold text-xl">Orthopedics</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="min-h-[200px] justify-around flex gap-2">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    "hover:bg-primary-main/80 rounded-lg hover:text-white",
                    location.pathname === item.url ? "bg-primary-main text-white" : "",
                    open && 'py-2'
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
        <div className={cn("flex flex-row p-1 justify-between hover:bg-primary-main/90 rounded-lg hover:text-white cursor-pointer", open && 'p-2')}>
          {open && <h1>Logout</h1>}
          <LogOut size={24} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
