import React, { useState } from "react";
import { Button } from "../ui/button";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SelectEmployeeDialogLoading({ description, onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 select-none" />
      {/* --- MODIFIED CONTAINER --- */}
      <div className="fixed top-8 bottom-8 left-1/2 z-50 flex w-full max-w-5xl -translate-x-1/2 flex-col gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
        {/* Optional: Add a title if you want it to be sticky at the top */}
        <div className="flex-shrink-0">
          <h2 className="text-xl font-bold select-none">
            {"Select an Employee"}
          </h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* --- SCROLLABLE CONTENT AREA --- */}
        <div className="custom-scrollbar flex-grow overflow-y-auto pr-6 pb-10">
          {" "}
          {/* pr-2 adds space for scrollbar */}
          <div className="select-none grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => (
              <Card key={i} className={`shadow-md  gap-3 `}>
                <CardContent className="space-y-3">
                  <div className="pb-2 flex gap-x-4">
                    <Skeleton className="size-16 rounded-full bg-input" />
                    <Skeleton className="mt-2 h-4 w-1/2 bg-input">
                      <Skeleton className="mt-7 h-4 w-1/2 bg-input" />
                    </Skeleton>
                  </div>
                  <Skeleton className="mt-2 h-4 w-1/2 bg-input" />
                  <Skeleton className="mt-2 h-4 w-1/4 bg-input" />
                  <Skeleton className="mt-2 h-4 w-2/3 bg-input" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* --- STICKY FOOTER --- */}
        <div className="flex flex-shrink-0 flex-row-reverse gap-2">
          <Button className="mt-2 sm:mt-0" disabled>
            Confirm
          </Button>
          <Button onClick={onClose} variant="outline" className="mt-2 sm:mt-0">
            Cancel
          </Button>
          {/* Add a confirm button here and pass the selected employee to onConfirm */}
        </div>
      </div>
    </>
  );
}
