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

const EmployeeDetailsDialog = ({ open, onOpenChange, data }) => {
  if (!data) return null;

  const { employee, tasks_summary } = data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
          <DialogDescription>
            Detailed information about {employee.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Employee Info */}
          <Card>
            <CardContent className="space-y-2 p-4">
              <p>
                <strong>Name:</strong> {employee.name}
              </p>
              <p>
                <strong>Email:</strong> {employee.email}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge variant="outline">{employee.status}</Badge>
              </p>
              <p>
                <strong>Task Capacity:</strong> {employee.task_capacity}
              </p>
              <p>
                <strong>Available Hours:</strong> {employee.available_hours}
              </p>
              <p className="text-xs text-gray-500">
                Created At: {new Date(employee.created_at).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Updated At: {new Date(employee.updated_at).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          {/* Tasks Summary */}
          <Card>
            <CardContent className="space-y-3 p-4">
              <h3 className="font-semibold text-lg">Tasks Summary</h3>
              {tasks_summary.map((task, idx) => (
                <div key={idx} className="border p-3 rounded-lg space-y-2">
                  <p>
                    📌 <strong>Parent Task:</strong>{" "}
                    {task.parent_task.description}
                  </p>
                  <div>
                    <strong>Assigned Subtasks:</strong>
                    <ul className="list-disc list-inside">
                      {task.assigned_subtasks.map((sub) => (
                        <li key={sub.id}>{sub.description}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsDialog;
