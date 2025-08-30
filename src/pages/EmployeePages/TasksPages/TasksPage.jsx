import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import useAxiosPut from "@/Hooks/UseAxiosPut";

const TasksPage = () => {
  const { data, loading } = useAxiosGet("employee/tasks");
  const { putData } = useAxiosPut("employee/tasks/subtasks");
  const [tasks, setTasks] = useState(data);
  useEffect(() => {
    setTasks(data);
  }, [data]);

  const markDone = (taskId, subtaskId) => {
    console.log(subtaskId);
    putData(
      {
        status: "completed",
      },
      `/${subtaskId}/status`,
      [["fetchData", "/employee/tasks"]]
    );
    setTasks((prev) =>
      prev.map((t) =>
        t.parent_task.id === taskId
          ? {
              ...t,
              assigned_subtasks: t.assigned_subtasks.map((s) =>
                s.id === subtaskId ? { ...s, status: "completed" } : s
              ),
            }
          : t
      )
    );
  };
  if (loading) <h1>loading...</h1>;
  return (
    <div className="p-6 space-y-6">
      {tasks?.map((task) => (
        <Card key={task.parent_task.id} className="shadow-md">
          <CardHeader>
            <CardTitle>{task.parent_task.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {task.assigned_subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-3 p-3 rounded-lg border"
                >
                  <Checkbox checked={subtask.status === "completed"} />
                  <Input
                    value={subtask.description}
                    className={
                      subtask.status === "completed"
                        ? "line-through opacity-60"
                        : ""
                    }
                    disabled={subtask.status === "completed"}
                  />
                  {subtask.status === "pending" && (
                    <Button
                      // variant=""
                      size="sm"
                      onClick={() => markDone(task.parent_task.id, subtask.id)}
                    >
                      Mark Done
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TasksPage;
