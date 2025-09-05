import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";
import { Calendar, Trash } from "lucide-react";

export default function TaskSkeleton() {
  return (
    <div className="flex  gap-x-2">
      {/* Skeleton for the delete button */}
      <Skeleton className="h-14 w-14 shrink-0 rounded-md grid place-content-center">
        <Skeleton className="h-6 w-6 bg-input" />
      </Skeleton>

      {/* Skeleton for the main task card */}
      <Skeleton className="flex w-full items-center gap-x-5 rounded-md  p-4">
        {/* 1. Index number placeholder */}
        <Skeleton className="h-6 w-6 bg-input rounded-full" />

        {/* 2. Description placeholder (takes up most of the space) */}
        <Skeleton className="h-4 flex-1 bg-input me-20" />

        {/* 3. Date placeholder */}
        <Skeleton className="h-4 w-40 bg-input" />
      </Skeleton>
    </div>
  );
}
