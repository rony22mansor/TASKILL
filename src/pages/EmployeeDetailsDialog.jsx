import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import useAxiosGet from "@/Hooks/UseAxiosGet";

const EmployeeDetailsDialog = ({ open, onOpenChange, id }) => {
  if (!id) return null;

  const { data, loading, error } = useAxiosGet(`admin/employees/${id}`);

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  if (error || !data) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>Error loading employee details.</DialogContent>
      </Dialog>
    );
  }

  const { employee, tasks_summary } = data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
          <DialogDescription>
            Detailed information about {employee?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <EmployeeInfo employee={employee} />
          <TaskSummary tasks={tasks_summary} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ---------------- Employee Info Card ---------------- */
const EmployeeInfo = ({ employee }) => (
  <Card>
    <CardContent className="space-y-2 p-4">
      <p>
        <strong>Name:</strong> {employee?.name}
      </p>
      <p>
        <strong>Email:</strong> {employee?.email}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <Badge variant="outline">{employee?.status}</Badge>
      </p>
      <p>
        <strong>Task Capacity:</strong> {employee?.task_capacity}
      </p>
      <p>
        <strong>Available Hours:</strong> {employee?.available_hours}
      </p>
      <p className="text-xs text-gray-500">
        Created At:{" "}
        {employee?.created_at
          ? new Date(employee.created_at).toLocaleString()
          : "—"}
      </p>
      <p className="text-xs text-gray-500">
        Updated At:{" "}
        {employee?.updated_at
          ? new Date(employee.updated_at).toLocaleString()
          : "—"}
      </p>
    </CardContent>
  </Card>
);

/* ---------------- Tasks Summary Card ---------------- */
const TaskSummary = ({ tasks }) => (
  <Card>
    <CardContent className="space-y-3 p-4">
      <h3 className="font-semibold text-lg">Tasks Summary</h3>
      {tasks?.length > 0 ? (
        tasks.map((task, idx) => (
          <div key={idx} className="border p-3 rounded-lg space-y-2">
            <p>
              📌 <strong>Parent Task:</strong>{" "}
              {task.parent_task?.description || "N/A"}
            </p>
            <div>
              <strong>Assigned Subtasks:</strong>
              <ul className="list-disc list-inside">
                {task.assigned_subtasks?.length > 0 ? (
                  task.assigned_subtasks.map((sub) => (
                    <li key={sub.id}>{sub.description}</li>
                  ))
                ) : (
                  <li>No subtasks assigned</li>
                )}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No tasks assigned.</p>
      )}
    </CardContent>
  </Card>
);

export default EmployeeDetailsDialog;
