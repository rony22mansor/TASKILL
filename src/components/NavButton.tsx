import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type NavButtonProps = {
  dkey?: string;
  isSidebarCollapsed: boolean;
  onNavigate: (page: string) => void;
  item: {
    name: string;
    icon: any;
  };
  activePage: string;
};

export default function NavButton({
  isSidebarCollapsed,
  onNavigate,
  item,
  dkey,
  activePage,
}: NavButtonProps) {
  // The button itself remains the same
  const button = (
    <Button
      size={isSidebarCollapsed ? "icon" : "default"}
      key={dkey}
      onClick={() => {
        onNavigate(item.name);
      }}
      className={`shadow-none flex items-center gap-3 px-3 py-2 bg-transparent transition-all hover:bg-primary/10 border-0 ${
        isSidebarCollapsed ? "justify-center" : "justify-start"
      } ${
        activePage === item.name
          ? "bg-primary text-white hover:bg-primary"
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

  // Conditionally wrap the button with a tooltip if the sidebar is collapsed
  if (isSidebarCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent
            side="right"
            className="text-white font-bold rounded-sm text-md"
          >
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Otherwise, return the button without a tooltip
  return button;
}
