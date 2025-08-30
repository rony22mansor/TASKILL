import DeleteTaskDialog from "@/components/tasks_components/DeleteTaskDialog";
import TaskCard from "@/components/tasks_components/TaskCard";
import TaskListEmpty from "@/components/tasks_components/TaskListEmpty";
import TaskSkeleton from "@/components/tasks_components/TaskSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import api from "@/lib/api/api";
import { deleteTask } from "@/lib/api/task_api";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { ClipboardList, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function TasksListPage({ onSelectTask, onNavigate }) {
  const [taskToDelete, setTaskToDelete] = useState(null);

  const deleteMutation = useMutation({
    mutationFn: deleteTask, // The function to call for deleting
    onSuccess: () => {
      setTaskToDelete(null);
      queryClient.invalidateQueries({ queryKey: ["fetchData", "admin/tasks"] });
    },
  });

  const {
    data,
    loading: isLoading,
    error,
    refetch,
  } = useAxiosGet("admin/tasks");

  const handleDeleteClick = (task, event) => {
    event.stopPropagation();
    setTaskToDelete(task);
  };

  const handleConfirmDelete = async (id) => {
    if (!taskToDelete) return;
    else {
      deleteMutation.mutate({ taskId: taskToDelete.id });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((e, index) => (
          <TaskSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!isLoading && !error && (!data || data.length === 0)) {
    return (
      <div className="flex  flex-col items-center justify-center ">
        <TaskListEmpty />
        <Button
          onClick={() => {
            onNavigate("Assign Task");
          }}
        >
          Create one +
        </Button>
      </div>
    );
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="space-y-4">
        {data.map((task, index) => (
          <div key={index} className="flex gap-x-2">
            <Card
              onClick={(e) => handleDeleteClick(task, e)}
              className="cursor-pointer h-full  p-4 rounded-md flex peer hover:bg-destructive/30 "
            >
              <Trash />
            </Card>
            <TaskCard
              refetch={refetch}
              onSelectTask={onSelectTask}
              task={task}
              index={index}
            />
          </div>
        ))}
      </div>
      <DeleteTaskDialog
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Are you absolutely sure?"
        description={`This action cannot be undone. This will permanently delete the task: "${taskToDelete?.description}"`}
      />
    </>
  );
}
