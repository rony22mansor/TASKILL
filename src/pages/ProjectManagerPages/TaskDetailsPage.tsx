import TaskListEmpty from "@/components/tasks_components/TaskListEmpty";
import TaskSkeleton from "@/components/tasks_components/TaskSkeleton";
import { Badge } from "@/components/ui/badge";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import api from "@/lib/api/api";
import React, { useState, useEffect } from "react";
import { text } from "stream/consumers";

export default function TaskDetailsPage({ task }) {
  const {
    data,
    loading: isLoading,

    error,
    isEmpty,
  } = useAxiosGet(`admin/tasks/${task.id}`);

  if (!isLoading && !error && (!data || data.length === 0)) {
    return <TaskListEmpty />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((e, index) => (
          <TaskSkeleton key={index} />
        ))}
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const color =
      {
        completed: "dark:bg-green-900/80 bg-green-300/70",
        in_progress: "dark:bg-amber-900/80 bg-amber-300/70",
        pending: "dark:bg-indigo-900/80 bg-indigo-300/70",
      }[status] || status;
    const variant =
      {
        completed: "outline",
        in_progress: "outline",
        pending: "outline",
      }[status] || "default";

    const text =
      {
        completed: "Completed",
        in_progress: "In Progress",
        pending: "Pending",
      }[status] || status;

    return (
      <Badge className={`${color}`} variant={variant}>
        {text}
      </Badge>
    );
  };
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-1">{data.task.description}</h2>
          <p className="text-sm text-muted-foreground">
            Created: {new Date(data.task.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Subtasks</h3>
        </div>
        <div className="border-t">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm ">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[50%]">
                    Description
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Assigned Employee
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0 ">
                {data.subtasks.map((subtask) => (
                  <tr
                    key={subtask.id}
                    className="border-b transition-colors  data-[state=selected]:bg-muted odd:bg-foreground/5 "
                  >
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                      {subtask.description}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 ">
                      {subtask.assigned_employee}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      {getStatusBadge(subtask.status)}
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
