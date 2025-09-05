import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function EmployeeCardLoading() {
  return (
    <Card className="shadow-md hover:shadow-lg transition py-0">
      <CardContent className="space-y-2 p-4">
        <div className="pb-2 flex gap-x-4">
          <Skeleton className="size-16 rounded-full bg-input" />
          <Skeleton className="mt-2 h-4 w-1/2 bg-input">
            <Skeleton className="mt-7 h-4 w-1/2 bg-input" />
          </Skeleton>
        </div>
        <Skeleton className="mt-2 h-4 w-1/2 bg-input" />
        <Skeleton className="mt-2 h-4 w-3/4 bg-input" />
        <Skeleton className="mt-2 h-4 w-2/4 bg-input" />
        <Skeleton className="mt-2 h-4 w-2/5 bg-input" />
        <Skeleton className="mt-2 h-4 w-2/3 bg-input" />
      </CardContent>

      <div className="flex justify-end gap-2 p-4">
        <Button disabled size="sm">
          Details
        </Button>
      </div>
    </Card>
  );
}
