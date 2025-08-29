import React from "react";
import { Button } from "./ui/button";

type NavButtonProps = {
  key?: string;
  isSidebarCollapsed: boolean;
  setActivePage: (string) => void;
  item: {
    name: string;
    icon: any;
  };
  activePage: string;
};

export default function NavButton({
  isSidebarCollapsed,
  setActivePage,
  item,
  key,
  activePage,
}: NavButtonProps) {
  return (
    <Button
      size={isSidebarCollapsed ? "icon" : "default"}
      key={key}
      onClick={() => {
        setActivePage(item.name);
      }}
      className={`shadow-none flex items-center gap-3 px-3 py-2 bg-transparent transition-all hover:bg-primary/10 border-0 ${
        isSidebarCollapsed ? "justify-center" : "justify-start"
      } ${
        activePage === item.name
          ? "bg-primary text-white hover:bg-primary  "
          : "text-muted-foreground"
      }`}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
      <span
        className={`whitespace-nowrap ${
          isSidebarCollapsed ? "hidden" : "flex"
        }`}
      >
        {item.name}
      </span>
    </Button>
  );
}
