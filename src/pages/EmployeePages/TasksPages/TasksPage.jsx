import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const initialData = [
  {
    parent_task: {
      id: 27,
      description:
        "Build an e-commerce website with Laravel and Vue.js, using Stripe for payments.",
    },
    assigned_subtasks: [
      {
        id: 1063,
        description:
          "Setup backend stack: Laravel (create project skeleton and README)",
        status: "pending",
      },
      {
        id: 1064,
        description:
          "Setup frontend stack: Vue (create project skeleton and README)",
        status: "pending",
      },
    ],
  },
];

const TasksPage = () => {
  const [tasks, setTasks] = useState(initialData);

  const handleEdit = (taskId, subtaskId, value) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.parent_task.id === taskId
          ? {
              ...t,
              assigned_subtasks: t.assigned_subtasks.map((s) =>
                s.id === subtaskId ? { ...s, description: value } : s
              ),
            }
          : t
      )
    );
  };

  const markDone = (taskId, subtaskId) => {
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

  return (
    <div className="p-6 space-y-6">
      {tasks.map((task) => (
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
                  <Checkbox checked={subtask.status === "completed"} disabled />
                  <Input
                    value={subtask.description}
                    onChange={(e) =>
                      handleEdit(
                        task.parent_task.id,
                        subtask.id,
                        e.target.value
                      )
                    }
                    className={
                      subtask.status === "completed"
                        ? "line-through opacity-60"
                        : ""
                    }
                    disabled={subtask.status === "completed"}
                  />
                  {subtask.status === "pending" && (
                    <Button
                      variant="secondary"
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
