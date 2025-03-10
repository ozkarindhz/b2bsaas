"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  FileText,
  Bell,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

const NavItem = ({
  href = "/",
  icon,
  label,
  isActive = false,
  isCollapsed = false,
}: NavItemProps) => {
  return (
    <li>
      {isCollapsed ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={href}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-full justify-start",
                    isActive ? "bg-accent text-accent-foreground" : "",
                  )}
                >
                  {icon}
                  <span className="sr-only">{label}</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Link href={href}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start gap-2",
              isActive ? "bg-accent text-accent-foreground" : "",
            )}
          >
            {icon}
            <span>{label}</span>
          </Button>
        </Link>
      )}
    </li>
  );
};

interface SidebarProps {
  isCollapsed?: boolean;
}

const Sidebar = ({ isCollapsed = false }: SidebarProps) => {
  const pathname = usePathname();

  const mainNavItems = [
    {
      href: "/",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      href: "/analytics",
      icon: <BarChart2 size={20} />,
      label: "Analytics",
    },
    {
      href: "/users",
      icon: <Users size={20} />,
      label: "Users",
    },
    {
      href: "/reports",
      icon: <FileText size={20} />,
      label: "Reports",
    },
    {
      href: "/notifications",
      icon: <Bell size={20} />,
      label: "Notifications",
    },
  ];

  const bottomNavItems = [
    {
      href: "/settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
    {
      href: "/help",
      icon: <HelpCircle size={20} />,
      label: "Help & Support",
    },
    {
      href: "/logout",
      icon: <LogOut size={20} />,
      label: "Logout",
    },
  ];

  return (
    <aside className="bg-background border-r flex flex-col h-full w-[250px] p-4">
      <div className="flex-1">
        <div className={cn("mb-8", isCollapsed ? "flex justify-center" : "")}>
          {isCollapsed ? (
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              B
            </div>
          ) : (
            <div className="text-xl font-bold">B2B SaaS</div>
          )}
        </div>

        <nav>
          <ul className="space-y-2">
            {mainNavItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </nav>
      </div>

      <nav className="mt-auto pt-4 border-t">
        <ul className="space-y-2">
          {bottomNavItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
