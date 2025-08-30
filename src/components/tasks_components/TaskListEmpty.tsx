import React from "react";

export default function TaskListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center  h-full gap-8 mb-2 mt-10 ">
      <img src="empty.svg" alt="empty tasks" className="w-1/2 h-auto " />
      <div className="text-lg text-muted-foreground">There is no Tasks</div>
    </div>
  );
}
