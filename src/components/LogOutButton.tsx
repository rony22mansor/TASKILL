import React from "react";

import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { LocalStorageKeys } from "@/lib/constants";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem(LocalStorageKeys.TOKEN);
    localStorage.removeItem(LocalStorageKeys.USER);
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Button
      onClick={() => handleLogout()}
      className=" text-muted-foreground shadow-none flex items-center gap-3 px-3 py-2 bg-transparent transition-all hover:bg-primary/10 border-0 justify-start"
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  );
}
