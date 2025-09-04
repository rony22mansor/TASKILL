import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import useAxiosPut from "@/Hooks/UseAxiosPut";

const TasksPage = () => {
  const [statusFilter, setStatusFilter] = useState("pending");
  const { data, loading } = useAxiosGet(
    `employee/tasks?status=${statusFilter}`
  );
  const { putData } = useAxiosPut("employee/tasks/subtasks");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const markDone = (taskId, subtask) => {
    let newStatus = subtask.status === "pending" ? "in_progress" : "completed";

    putData({ status: newStatus }, `/${subtask.id}/status`, [
      ["fetchData", `/employee/tasks?status=${statusFilter}`],
    ]).then((response) => {
      if (response.status == 200) {
        setStatusFilter(newStatus);
      }
    });
  };

  if (loading) return <h1 className="p-6">Loading...</h1>;

  return (
    <div className="p-6 space-y-6">
      {/* Nicer Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6 bg-gray-100 rounded-xl p-1">
          <TabsTrigger
            value="pending"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-black transition"
          >
            ⏳ Pending
          </TabsTrigger>
          <TabsTrigger
            value="in_progress"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-black transition"
          >
            🚀 In Progress
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-black transition"
          >
            ✅ Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {tasks?.map((task) => (
        <Card
          key={task.parent_task.id}
          className="shadow-md hover:shadow-lg transition"
        >
          <CardHeader>
            <CardTitle>{task.parent_task.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {task.assigned_subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition"
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
                  {subtask.status !== "completed" && (
                    <Button
                      size="sm"
                      onClick={() => markDone(task.parent_task.id, subtask)}
                    >
                      {subtask.status === "pending"
                        ? "Start Task"
                        : "Mark Completed"}
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
