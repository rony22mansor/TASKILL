import React from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function TaskDetailsSkeleton() {
  return (
    <div className=" space-y-6">
      {/* 1. Main Task Description Card (New Style) */}
      <Skeleton className="rounded-lg p-4 ">
        <div className="space-y-4">
          <Skeleton className="h-6 w-full bg-input" />
          <Skeleton className="mt-2 h-4 w-1/3 bg-input" />
        </div>
      </Skeleton>

      <div className="rounded-lg  bg-card text-card-foreground">
        <div className="p-4">
          <h3 className="text-lg font-semibold">
            <Skeleton className="mt-2 h-8 w-1/4 bg-input" />
          </h3>
        </div>
        <div className="border-t">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm ">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[50%]">
                    <Skeleton className="mt-2 h-6 w-1/3 bg-input" />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    <Skeleton className="mt-2 h-6 w-1/2 bg-input" />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    <Skeleton className="mt-2 h-6 w-1/2 bg-input" />
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0 ">
                {[1, 2, 3, 4, 5, 6].map((e, i) => (
                  <tr
                    key={i}
                    className="border-b transition-colors  data-[state=selected]:bg-muted odd:bg-primary/8 "
                  >
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                      <Skeleton className="mt-2 h-4 w-1/3 bg-input" />
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 ">
                      <Skeleton className="mt-2 h-4 w-1/2 bg-input" />
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <Skeleton className="mt-2 h-4 w-1/3 bg-input" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
