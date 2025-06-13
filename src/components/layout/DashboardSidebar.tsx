import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Settings,
  User,
  BarChart3,
  Package,
  MessageSquare,
  Shield,
  Star,
  DollarSign,
  Clock,
  Users,
  Home,
  FileText,
  Bell,
  Workflow,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
}

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

const customerMenuGroups: SidebarGroup[] = [
  {
    label: "Dashboard",
    items: [
      { title: "Overview", url: "/customer/dashboard", icon: Home },
      { title: "My Bookings", url: "/customer/bookings", icon: Calendar },
      { title: "Messages", url: "/customer/messages", icon: MessageSquare },
      { title: "Favorites", url: "/customer/favorites", icon: Star },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/customer/profile", icon: User },
      { title: "Settings", url: "/customer/settings", icon: Settings },
    ],
  },
];

const providerMenuGroups: SidebarGroup[] = [
  {
    label: "Dashboard",
    items: [
      { title: "Overview", url: "/provider/dashboard", icon: Home },
      { title: "Operations", url: "/provider/operations", icon: Workflow },
      { title: "Services", url: "/provider/services", icon: Package },
      { title: "Bookings", url: "/provider/bookings", icon: Calendar },
    ],
  },
  {
    label: "Business",
    items: [
      { title: "Analytics", url: "/provider/analytics", icon: BarChart3 },
      { title: "Reviews", url: "/provider/reviews", icon: Star },
      { title: "Messages", url: "/provider/messages", icon: MessageSquare },
      { title: "Earnings", url: "/provider/earnings", icon: DollarSign },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/provider/profile", icon: User },
      { title: "Verification", url: "/provider/verification", icon: Shield },
      { title: "Settings", url: "/provider/settings", icon: Settings },
    ],
  },
];

const adminMenuGroups: SidebarGroup[] = [
  {
    label: "Administration",
    items: [
      { title: "Overview", url: "/admin/dashboard", icon: Home },
      { title: "Users", url: "/admin/users", icon: Users },
      { title: "Services", url: "/admin/services", icon: Package },
      { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Reports", url: "/admin/reports", icon: FileText },
      { title: "Moderation", url: "/admin/moderation", icon: Shield },
      { title: "Settings", url: "/admin/settings", icon: Settings },
    ],
  },
];

interface DashboardSidebarProps {
  userType: "customer" | "provider" | "admin";
}

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  const getMenuGroups = () => {
    switch (userType) {
      case "customer":
        return customerMenuGroups;
      case "provider":
        return providerMenuGroups;
      case "admin":
        return adminMenuGroups;
      default:
        return [];
    }
  };

  const menuGroups = getMenuGroups();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-xl flex items-center justify-center">
            {/* <span className="text-white font-bold text-lg">Q</span> */}
            <img src="/logo.png" alt="" className="rounded-xl" />
          </div>
          <span className="text-xl font-bold">Quïp</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-1">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
