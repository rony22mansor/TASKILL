import React from "react";
export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold">Welcome back</div>
      <div className="text-muted-foreground text-sm">
        Login to Manage Your Tasks
      </div>
    </div>
  );
}
