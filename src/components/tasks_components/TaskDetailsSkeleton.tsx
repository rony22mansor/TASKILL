import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function TaskDetailsSkeleton() {
  return (
    <div className="flex flex-col w-full   items-center h-full space-y-4">
      <Skeleton className="h-12 w-full  border-1 border-foreground/15  bg-foreground/10 p-4">
        <Skeleton className="h-4 w-full rounded-sm bg-foreground/25" />
      </Skeleton>
      <Skeleton className="h-80 w-full  border-1 border-foreground/15  bg-foreground/10 p-4 flex flex-col gap-y-4">
        <Skeleton className="h-4 w-full rounded-sm bg-foreground/25" />
        <Skeleton className="h-4 w-full rounded-sm bg-foreground/25" />
        <Skeleton className="h-4 w-full rounded-sm bg-foreground/25" />
        <Skeleton className="h-4 w-full rounded-sm bg-foreground/25" />
      </Skeleton>
    </div>
  );
}
