import DeleteTaskDialog from "@/components/tasks_components/DeleteTaskDialog";
import SelectEmployeeDialog from "@/components/tasks_components/SelectEmployeeDialog";
import TaskDetailsSkeleton from "@/components/tasks_components/TaskDetailsSkeleton";
import TaskListEmpty from "@/components/tasks_components/TaskListEmpty";
import TaskSkeleton from "@/components/tasks_components/TaskSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import api from "@/lib/api/api";
import {
  assignSubtask,
  deleteSubtask,
  reAssignSubtask,
} from "@/lib/api/task_api";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { sub } from "date-fns";
import {
  Edit,
  Ellipsis,
  EllipsisVertical,
  Link,
  Trash,
  Unlink,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { text } from "stream/consumers";

export default function TaskDetailsPage({ task }) {
  const [subtaskToDelete, setSubtaskToDelete] = useState(null);
  const [subtaskToAssign, setSubtaskToAssign] = useState(null);
  const [subtaskToReAssign, setSubtaskToReAssign] = useState(null);
  const employee = useRef(null);

  const deleteMutation = useMutation({
    mutationFn: deleteSubtask,
    onSuccess: () => {
      toast.success("Assignment Deleted Successfully");

      queryClient.invalidateQueries({
        queryKey: ["fetchData", `admin/tasks/${task.id}`],
      });
    },
    onError: () => {
      toast.error("Something went wrong while deleting the assignment");
    },
  });

  const assignMutation = useMutation({
    mutationFn: assignSubtask,
    onSuccess: () => {
      toast.success("Subtask had been assigned successfully");

      queryClient.invalidateQueries({
        queryKey: ["fetchData", `admin/tasks/${task.id}`],
      });
    },
    onError: () => {
      toast.error("Something went wrong while assigning the subtask");
    },
  });

  const reAssignMutation = useMutation({
    mutationFn: reAssignSubtask,
    onSuccess: () => {
      toast.success("Subtask had been re-assigned successfully");

      queryClient.invalidateQueries({
        queryKey: ["fetchData", `admin/tasks/${task.id}`],
      });
    },
    onError: () => {
      toast.error("Something went wrong while re-assigning the subtask");
    },
  });

  const handleReAssignClick = (subtask, event) => {
    event.stopPropagation();
    setSubtaskToReAssign(subtask);
  };

  const handleConfirmReAssign = async (employeeId) => {
    console.log("employeeId ==> ", employeeId);
    console.log("subtaskToEdit ==> ", subtaskToAssign);

    if (!subtaskToReAssign.assignment_id || !employee) return;
    reAssignMutation.mutate({
      assignmentId: subtaskToReAssign.assignment_id,
      employeeId: employeeId,
    });
    setSubtaskToReAssign(null);
  };

  const handleAssignClick = (subtask, event) => {
    event.stopPropagation();
    setSubtaskToAssign(subtask);
  };

  const handleConfirmAssign = async (employeeId) => {
    console.log("employeeId ==> ", employeeId);
    console.log("subtaskToEdit ==> ", subtaskToAssign);
    console.log(
      "!subtaskToEdit || employee ==> ",
      !subtaskToAssign || employee
    );
    if (!subtaskToAssign || !employee) return;
    assignMutation.mutate({
      employeeId: employeeId,
      subtaskId: subtaskToAssign.id,
    });
    setSubtaskToAssign(null);
  };

  const handleDeleteClick = (subtask, event) => {
    event.stopPropagation();
    setSubtaskToDelete(subtask);
  };

  const handleConfirmDelete = async (id) => {
    if (!subtaskToDelete.assignment_id) return;
    else {
      deleteMutation.mutate({ subtaskId: subtaskToDelete.assignment_id });
      setSubtaskToDelete(null);
    }
  };

  const {
    data,
    loading: isLoading,
    error,
    isEmpty,
  } = useAxiosGet(`admin/tasks/${task.id}`);

  if (
    isLoading ||
    assignMutation.isPending ||
    deleteMutation.isPending ||
    reAssignMutation.isPending
  ) {
    return <TaskDetailsSkeleton />;
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
    <>
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
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      {" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0 ">
                  {data.subtasks.map((subtask) => (
                    <tr
                      key={subtask.id}
                      className="border-b transition-colors  data-[state=selected]:bg-muted odd:bg-primary/8 "
                    >
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                        {subtask.description}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 ">
                        {subtask.assigned_employee === "N/A"
                          ? "-"
                          : subtask.assigned_employee}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        {getStatusBadge(subtask.status)}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              disabled={
                                subtask.status === "completed" ||
                                subtask.status === "in_progress"
                              }
                              size="icon"
                              variant="outline"
                              className="border-1 cursor-pointer"
                            >
                              <Ellipsis />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            side="left"
                            className="w-30 p-2 shadow-lg z-30"
                            align="end"
                            asChild
                          >
                            <div className="flex flex-col gap-2">
                              {subtask.assigned_employee === "N/A" ? (
                                <Button
                                  onClick={(e) => handleAssignClick(subtask, e)}
                                  variant="ghost"
                                  className="flex justify-start text-primary hover:text-primary hover:bg-primary/30"
                                >
                                  <Link />
                                  Assign
                                </Button>
                              ) : (
                                <Button
                                  onClick={(e) =>
                                    handleReAssignClick(subtask, e)
                                  }
                                  variant="ghost"
                                  className="flex justify-start text-primary hover:text-primary hover:bg-primary/30"
                                >
                                  <Edit />
                                  Re-Assign
                                </Button>
                              )}

                              {subtask.assigned_employee !== "N/A" && (
                                <Button
                                  onClick={(e) => handleDeleteClick(subtask, e)}
                                  variant="ghost"
                                  className="flex justify-start text-destructive hover:text-destructive hover:bg-destructive/30"
                                >
                                  <Unlink />
                                  Unassign
                                </Button>
                              )}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DeleteTaskDialog
        isOpen={!!subtaskToDelete}
        onClose={() => setSubtaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Are you absolutely sure?"
        description={`This action cannot be undone. This will permanently unassign the subtask: "${subtaskToDelete?.description}"`}
      />

      <SelectEmployeeDialog
        isOpen={!!subtaskToAssign}
        onClose={() => setSubtaskToAssign(null)}
        onConfirm={handleConfirmAssign}
        title="Assign this task to the Employee"
        description={task.description}
      />
      <SelectEmployeeDialog
        isOpen={!!subtaskToReAssign}
        onClose={() => setSubtaskToReAssign(null)}
        onConfirm={handleConfirmReAssign}
        title="Assign this task to the Employee"
        description={task.description}
      />
    </>
  );
}
