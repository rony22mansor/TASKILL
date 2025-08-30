import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function TaskSkeleton() {
  return (
    <div className="flex items-center space-y-4">
      <Skeleton className="h-12 w-full  border-2 border-foreground/15  bg-foreground/10 p-4">
        <Skeleton className="h-full w-full rounded-sm bg-foreground/25" />
      </Skeleton>
    </div>
  );
}
