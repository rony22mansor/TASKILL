import { Button } from "@/components/ui/button";
import {
  ListChecks,
  Settings,
  ChevronRight,
  ChevronLeft,
  Goal,
  CircleUserRound,
  Settings2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import NavButton from "@/components/NavButton";
import { LocalStorageKeys } from "@/lib/constants";
import LogOutButton from "@/components/LogoutButton";
import Profilepage from "./EmployeePages/ProfilePages/Profilepage";
import TasksPage from "./EmployeePages/TasksPages/TasksPage";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EDashboardPage() {
  const [activePage, setActivePage] = useState("My Profile");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAccountPopoverOpen, setIsAccountPopoverOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const userString = localStorage.getItem(LocalStorageKeys.USER);

    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserInfo({ name: user.name, email: user.email });
      } catch (error) {
        setUserInfo(undefined);
      }
    } else {
      setUserInfo(undefined);
    }
  }, []);

  const renderActivePage = () => {
    switch (activePage) {
      case "My Profile":
        return <Profilepage />;
      case "My Tasks":
        return <TasksPage />;

      default:
        return <h1>Profile</h1>;
    }
  };

  const handleNavigate = (pageName) => {
    setActivePage(pageName);
  };

  const navItems = [
    { name: "My Profile", icon: CircleUserRound },
    { name: "My Tasks", icon: ListChecks },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <div
        className={`grid h-full w-full  ${
          isSidebarCollapsed
            ? "md:grid-cols-[72px_1fr]"
            : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
        }`}
      >
        {/* SideBar */}
        <div
          className={`fixed inset-y-0 left-0 z-10 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800  md:relative md:translate-x-0 ${
            isSidebarCollapsed ? "w-[72px]" : "w-[220px] lg:w-[280px]"
          }`}
        >
          <div className="flex h-full max-h-screen flex-col">
            <div className="flex h-14 items-center  px-6 lg:h-[60px] gap-3">
              <a
                href="/"
                className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50 overflow-hidden"
              >
                <Goal className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                <span
                  className={`whitespace-nowrap transition-opacity font-brand text-2xl ${
                    isSidebarCollapsed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  TASKILL
                </span>
              </a>
            </div>
            <div className="flex-1 overflow-y-clip">
              <nav
                className={
                  "grid items-start text-sm font-medium  px-4 py-4 gap-2"
                }
              >
                {navItems.map((item) => (
                  <NavButton
                    key={item.name}
                    item={item}
                    activePage={activePage}
                    isSidebarCollapsed={isSidebarCollapsed}
                    onNavigate={handleNavigate}
                  />
                ))}
              </nav>
            </div>
            <div className="mt-auto  p-4 grid">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className={`w-full text-muted-foreground shadow-none flex items-center gap-3 px-3 py-2 bg-transparent transition-all hover:bg-primary/10 border-0 ${
                      isSidebarCollapsed ? "justify-center" : "justify-start"
                    }`}
                  >
                    <Settings2 className="h-5 w-5 flex-shrink-0" />
                    <span
                      className={`whitespace-nowrap ${
                        isSidebarCollapsed ? "hidden" : "flex"
                      }`}
                    >
                      Settings
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  alignOffset={20}
                  className="w-60 p-3"
                >
                  <ThemeToggleButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        {/* Contents */}
        <div className="flex flex-col h-screen">
          {/* AppBar */}
          <header className="flex justify-end items-center gap-4  p-7 h-[40px]  sticky top-0 z-10">
            <div className="w-full flex-1">
              {/* Header content like breadcrumbs or page title can go here */}
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              {/* <button className="relative rounded-full p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </button> */}
              {/* Account */}
              <div
                className="relative"
                onMouseEnter={() => setIsAccountPopoverOpen(true)}
                onMouseLeave={() => setIsAccountPopoverOpen(false)}
              >
                <Button className="flex items-center gap-2 rounded-full p-1 dark:hover:bg-gray-800 h-8 w-8 justify-center  text-white">
                  {userInfo?.name?.[0]}
                </Button>
                {/* Account Popover */}
                {isAccountPopoverOpen && (
                  <div className="absolute top-full right-0 w-64 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-10 animate-fade-in-up">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {userInfo?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {userInfo?.email}
                      </p>
                    </div>
                    <div className="p-2 grid">
                      <LogOutButton />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">{renderActivePage()}</main>
        </div>
      </div>
      {/* Collapse SideBar Button */}
      <Button
        asChild
        variant="secondary"
        size="icon"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className={` border-2 absolute top-1/2 z-10  -translate-x-1/2  ${
          isSidebarCollapsed ? "left-[72px]" : "left-[220px] lg:left-[280px]"
        }`}
      >
        <div>
          {isSidebarCollapsed ? (
            <ChevronRight className="h-20 w-20" />
          ) : (
            <ChevronLeft className="h-20 w-20 " />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </div>
      </Button>
    </div>
  );
}
