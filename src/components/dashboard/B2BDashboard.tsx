"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Search,
  Bell,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  BarChart,
  Clock,
  DollarSign,
  Users,
  LayoutDashboard,
  PieChart,
  LineChart,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  ChevronDown,
  Menu,
  X,
  Home,
  User,
  Calendar,
  MessageSquare,
  BarChart2,
  Globe,
  Zap,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";

interface DeviceSessionProps {
  device: string;
  sessions: string;
  percentage: string;
  color: string;
}

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendIsPositive: boolean;
  iconBgColor: string;
  icon: React.ReactNode;
}

interface TrafficChannelProps {
  channel: string;
  percentage: string;
  value: number;
  color: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
  collapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  href = "#",
  collapsed = false,
}) => {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active ? "bg-primary text-primary-foreground" : "text-white hover:bg-white/10"}`}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!collapsed && (
        <span className="font-medium whitespace-nowrap">{label}</span>
      )}
      {active && !collapsed && (
        <div className="ml-auto w-1.5 h-6 bg-white/20 rounded-full"></div>
      )}
    </a>
  );
};

const B2BDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTimeRange, setActiveTimeRange] = useState("month");
  const [activeChartType, setActiveChartType] = useState("line");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) return null;

  // Device session data
  const deviceSessions: DeviceSessionProps[] = [
    {
      device: "Desktop",
      sessions: "8,085",
      percentage: "42%",
      color: "#3b82f6",
    },
    {
      device: "Mobile",
      sessions: "6,272",
      percentage: "33%",
      color: "#22c55e",
    },
    {
      device: "Tablets",
      sessions: "4,768",
      percentage: "25%",
      color: "#f59e0b",
    },
  ];

  // Metric cards data
  const metricCards: MetricCardProps[] = [
    {
      title: "Users",
      value: "72.6k",
      trend: "+25%",
      trendIsPositive: true,
      iconBgColor: "bg-[#3574ff]/10",
      icon: <Users className="h-5 w-5 text-[#3574ff]" />,
    },
    {
      title: "Sessions",
      value: "87.2k",
      trend: "+47%",
      trendIsPositive: true,
      iconBgColor: "bg-[#f36643]/10",
      icon: <BarChart className="h-5 w-5 text-[#f36643]" />,
    },
    {
      title: "Bounce Rate",
      value: "26.3%",
      trend: "-28%",
      trendIsPositive: false,
      iconBgColor: "bg-[#4524f8]/10",
      icon: <ArrowDown className="h-5 w-5 text-[#4524f8]" />,
    },
    {
      title: "Session Duration",
      value: "2m 18s",
      trend: "+13%",
      trendIsPositive: true,
      iconBgColor: "bg-[#24d6a5]/10",
      icon: <Clock className="h-5 w-5 text-[#24d6a5]" />,
    },
  ];

  // Chart data (months)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Traffic channels data
  const trafficChannels: TrafficChannelProps[] = [
    { channel: "Direct", percentage: "42.8%", value: 75, color: "#3b82f6" },
    { channel: "Social", percentage: "31.5%", value: 60, color: "#22c55e" },
    { channel: "Referral", percentage: "25.7%", value: 45, color: "#f59e0b" },
  ];

  // Recent activities data
  const recentActivities = [
    {
      user: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        initials: "AJ",
      },
      action: "completed",
      target: "Q2 Sales Report",
      time: "10 minutes ago",
    },
    {
      user: {
        name: "Maria Garcia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        initials: "MG",
      },
      action: "updated",
      target: "Marketing Campaign",
      time: "1 hour ago",
    },
    {
      user: {
        name: "David Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        initials: "DK",
      },
      action: "commented on",
      target: "Product Roadmap",
      time: "3 hours ago",
    },
  ];

  // Navigation items
  const mainNavItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
    { icon: <BarChart2 size={20} />, label: "Analytics" },
    { icon: <Users size={20} />, label: "Customers" },
    { icon: <Calendar size={20} />, label: "Calendar" },
    { icon: <MessageSquare size={20} />, label: "Messages" },
    { icon: <FileText size={20} />, label: "Documents" },
  ];

  const bottomNavItems = [
    { icon: <Settings size={20} />, label: "Settings" },
    { icon: <HelpCircle size={20} />, label: "Help Center" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#eceef1] flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className={`bg-[#563bff] text-white transition-all duration-300 ${isSidebarOpen ? "md:w-64" : "md:w-16"} ${isSidebarOpen ? "h-auto" : "h-16"} md:h-full flex ${isSidebarOpen ? "flex-col" : "flex-row"} md:flex-col relative z-20`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute md:-right-3 right-4 md:top-12 top-4 bg-white text-[#563bff] rounded-full p-1 shadow-md z-10"
        >
          {isSidebarOpen ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronRight size={16} className="rotate-180" />
          )}
        </button>

        {/* Logo */}
        <div
          className={`${isSidebarOpen ? "p-6" : "p-3"} flex items-center ${isSidebarOpen ? "justify-center" : "justify-start"} md:justify-center`}
        >
          <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          {isSidebarOpen && (
            <span className="ml-3 font-bold text-xl">SaaSHub</span>
          )}
        </div>

        {/* Main Navigation */}
        <div
          className={`${isSidebarOpen ? "flex-1" : "hidden"} md:flex-1 px-3 py-4 overflow-y-auto`}
        >
          <div className="space-y-1 flex flex-col items-center">
            {mainNavItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                active={item.active}
                href={`#${item.label.toLowerCase()}`}
                collapsed={!isSidebarOpen}
              />
            ))}
          </div>

          <div className="mt-8">
            {isSidebarOpen && (
              <h3 className="px-4 text-xs font-semibold text-white uppercase tracking-wider">
                Insights
              </h3>
            )}
            <div className="mt-2 space-y-1 flex flex-col items-center">
              <NavItem
                icon={<Globe size={20} />}
                label="Regional"
                collapsed={!isSidebarOpen}
              />
              <NavItem
                icon={<PieChart size={20} />}
                label="Demographics"
                collapsed={!isSidebarOpen}
              />
              <NavItem
                icon={<LineChart size={20} />}
                label="Trends"
                collapsed={!isSidebarOpen}
              />
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div
          className={`${isSidebarOpen ? "block" : "hidden"} md:block p-4 border-t border-white/10`}
        >
          <div className="space-y-1 flex flex-col items-center">
            {bottomNavItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                href={`#${item.label.toLowerCase()}`}
                collapsed={!isSidebarOpen}
              />
            ))}
          </div>

          {isSidebarOpen && (
            <div className="mt-6 flex items-center">
              <Avatar className="h-10 w-10 border-2 border-white/20">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  alt="John Doe"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-white/60">Admin</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <ChevronDown size={16} className="text-white/60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background text-foreground w-full">
        {/* Header */}
        <header className="bg-card border-b border-border py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="relative w-full sm:w-64 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search anything..."
                className="pl-10 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-[#563bff]"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#563bff]"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {recentActivities.map((activity, index) => (
                  <DropdownMenuItem key={index} className="py-3 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={activity.user.avatar}
                          alt={activity.user.name}
                        />
                        <AvatarFallback>
                          {activity.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">
                            {activity.user.name}
                          </span>{" "}
                          <span className="text-muted-foreground">
                            {activity.action}
                          </span>{" "}
                          <span className="font-medium text-[#563bff]">
                            {activity.target}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                      alt="John Doe"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Welcome back, here's what's happening with your business
                  today.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {metricCards.map((card, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transition-all duration-200 hover:shadow-md border-border"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {card.title}
                        </p>
                        <h3 className="text-2xl font-bold mt-2 text-foreground">
                          {card.value}
                        </h3>
                        <div
                          className={`flex items-center mt-2 ${card.trendIsPositive ? "text-green-500" : "text-red-500"}`}
                        >
                          {card.trendIsPositive ? (
                            <ArrowUp className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="text-sm font-medium">
                            {card.trend}
                          </span>
                          <span className="text-xs text-muted-foreground/80 ml-1">
                            vs last month
                          </span>
                        </div>
                      </div>
                      <div className={`${card.iconBgColor} p-3 rounded-lg`}>
                        {card.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Performance Chart */}
              <Card className="lg:col-span-2 overflow-hidden">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 gap-2">
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      Performance
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Revenue & user growth over time
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tabs
                      defaultValue="month"
                      value={activeTimeRange}
                      onValueChange={setActiveTimeRange}
                      className="w-full sm:w-[300px]"
                    >
                      <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 pb-2">
                  <div className="h-[300px] w-full">
                    <Tabs
                      defaultValue="line"
                      value={activeChartType}
                      onValueChange={setActiveChartType}
                    >
                      <div className="flex justify-end mb-4">
                        <TabsList>
                          <TabsTrigger
                            value="line"
                            className="flex items-center gap-1"
                          >
                            <LineChart className="h-4 w-4" />
                          </TabsTrigger>
                          <TabsTrigger
                            value="bar"
                            className="flex items-center gap-1"
                          >
                            <BarChart className="h-4 w-4" />
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent value="line" className="h-[250px] mt-0">
                        <div className="h-full w-full relative">
                          <svg className="w-full h-full" viewBox="0 0 800 250">
                            {/* Grid lines */}
                            {[0, 1, 2, 3, 4].map((i) => (
                              <line
                                key={i}
                                x1="0"
                                y1={50 * i}
                                x2="800"
                                y2={50 * i}
                                stroke="#f0f0f5"
                                strokeWidth="1"
                              />
                            ))}

                            {/* Chart line */}
                            <path
                              d="M0,200 C100,180 200,100 300,90 C400,80 500,120 600,110 C700,100 750,60 800,50"
                              fill="none"
                              stroke="#563bff"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />

                            {/* Area under the line */}
                            <path
                              d="M0,200 C100,180 200,100 300,90 C400,80 500,120 600,110 C700,100 750,60 800,50 V250 H0 Z"
                              fill="url(#gradient)"
                              fillOpacity="0.2"
                            />

                            {/* Gradient definition */}
                            <defs>
                              <linearGradient
                                id="gradient"
                                x1="0%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#563bff"
                                  stopOpacity="0.5"
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#563bff"
                                  stopOpacity="0"
                                />
                              </linearGradient>
                            </defs>

                            {/* Data points */}
                            {[200, 180, 100, 90, 80, 120, 110, 100, 60, 50].map(
                              (y, i) => {
                                const x = i * 80;
                                return (
                                  <g
                                    key={i}
                                    className="transition-all duration-200 hover:opacity-100"
                                  >
                                    <circle
                                      cx={x}
                                      cy={y}
                                      r="4"
                                      fill="#563bff"
                                      stroke="white"
                                      strokeWidth="2"
                                      className="hover:r-6 transition-all duration-200"
                                    />
                                  </g>
                                );
                              },
                            )}
                          </svg>

                          {/* X-axis labels */}
                          <div className="flex justify-between px-2 mt-2 overflow-x-auto">
                            {months.slice(0, 10).map((month, i) => (
                              <div
                                key={i}
                                className="text-xs text-muted-foreground"
                              >
                                {month}
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="bar" className="h-[250px] mt-0">
                        <div className="h-full w-full">
                          <svg className="w-full h-full" viewBox="0 0 800 250">
                            {/* Grid lines */}
                            {[0, 1, 2, 3, 4].map((i) => (
                              <line
                                key={i}
                                x1="0"
                                y1={50 * i}
                                x2="800"
                                y2={50 * i}
                                stroke="#f0f0f5"
                                strokeWidth="1"
                              />
                            ))}

                            {/* Bars */}
                            {[
                              180, 150, 200, 120, 160, 140, 190, 130, 170, 110,
                            ].map((height, i) => {
                              const x = i * 80 + 20;
                              return (
                                <rect
                                  key={i}
                                  x={x}
                                  y={250 - height}
                                  width="40"
                                  height={height}
                                  rx="4"
                                  fill="#563bff"
                                  fillOpacity="0.8"
                                  className="transition-all duration-300 hover:fill-opacity-1"
                                />
                              );
                            })}
                          </svg>

                          {/* X-axis labels */}
                          <div className="flex justify-between px-6 mt-2 overflow-x-auto">
                            {months.slice(0, 10).map((month, i) => (
                              <div
                                key={i}
                                className="text-xs text-muted-foreground"
                              >
                                {month}
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              {/* Sessions By Device */}
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Sessions By Device
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-center mb-6 px-2">
                    <div className="relative w-36 h-36 sm:w-48 sm:h-48">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full transform -rotate-90"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#f2f3f8"
                          strokeWidth="10"
                        />

                        {/* Pie segments - calculated based on percentages */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#3b82f6"
                          strokeWidth="10"
                          strokeDasharray={`${42 * 2.83} ${100 * 2.83}`}
                          strokeDashoffset="0"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#22c55e"
                          strokeWidth="10"
                          strokeDasharray={`${33 * 2.83} ${100 * 2.83}`}
                          strokeDashoffset={`${-42 * 2.83}`}
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#f59e0b"
                          strokeWidth="10"
                          strokeDasharray={`${25 * 2.83} ${100 * 2.83}`}
                          strokeDashoffset={`${-(42 + 33) * 2.83}`}
                        />

                        {/* Inner white circle */}
                        <circle cx="50" cy="50" r="35" fill="white" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">
                          19K
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Total Sessions
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {deviceSessions.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-3"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium text-foreground">
                            {item.device}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-foreground">
                            {item.sessions}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {item.percentage}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sessions By Channel */}
              <Card className="lg:col-span-2 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Sessions By Channel
                  </CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </Button>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-6">
                    {trafficChannels.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm font-medium text-foreground">
                              {item.channel}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-foreground">
                            {item.percentage}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500 ease-in-out"
                            style={{
                              width: `${item.value}%`,
                              backgroundColor: item.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-sm font-semibold mb-4 text-foreground">
                      Top Referrers
                    </h4>
                    <div className="space-y-3">
                      {[
                        {
                          source: "google.com",
                          visits: "3,892",
                          conversion: "2.4%",
                        },
                        {
                          source: "facebook.com",
                          visits: "1,657",
                          conversion: "1.8%",
                        },
                        {
                          source: "twitter.com",
                          visits: "1,239",
                          conversion: "0.9%",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0"
                        >
                          <span className="text-sm font-medium text-foreground">
                            {item.source}
                          </span>
                          <div className="flex items-center gap-3 sm:gap-6">
                            <span className="text-sm text-muted-foreground sm:w-20 text-left sm:text-right">
                              {item.visits} visits
                            </span>
                            <span className="text-sm text-green-500 sm:w-16 text-left sm:text-right">
                              {item.conversion}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span className="text-sm">View all</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-6">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={activity.user.avatar}
                            alt={activity.user.name}
                          />
                          <AvatarFallback>
                            {activity.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">
                              {activity.user.name}
                            </span>{" "}
                            <span className="text-muted-foreground">
                              {activity.action}
                            </span>{" "}
                            <span className="font-medium text-[#563bff]">
                              {activity.target}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-sm font-semibold mb-4 text-foreground">
                      Today's Goals
                    </h4>
                    <div className="space-y-3">
                      {[
                        { task: "Complete Q2 planning", progress: 75 },
                        { task: "Review marketing campaign", progress: 40 },
                        { task: "Finalize budget report", progress: 90 },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">
                              {item.task}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.progress}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#563bff] rounded-full transition-all duration-500 ease-in-out"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default B2BDashboard;
