import React, { useState } from "react";
import { Button } from "../ui/button";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function SelectEmployeeDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) {
  if (!isOpen) return null;

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { data, error, loading, isEmpty } = useAxiosGet("admin/employees");

  if (loading) {
    // You might want a better loading state, like a spinner in the dialog
    return (
      <>
        <div className="fixed inset-0 z-50 bg-black/80" />
        <div className="fixed top-8 bottom-8 left-1/2 z-50 flex w-full max-w-5xl -translate-x-1/2 items-center justify-center border bg-background p-6 shadow-lg sm:rounded-lg">
          <p>Loading employees...</p>
        </div>
      </>
    );
  }

  const handleCardClicked = (employeeId) => {
    if (selectedEmployee == employeeId) setSelectedEmployee(null);
    else setSelectedEmployee(employeeId);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 select-none" />
      {/* --- MODIFIED CONTAINER --- */}
      <div className="fixed top-8 bottom-8 left-1/2 z-50 flex w-full max-w-5xl -translate-x-1/2 flex-col gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
        {/* Optional: Add a title if you want it to be sticky at the top */}
        <div className="flex-shrink-0">
          <h2 className="text-xl font-bold select-none">
            {title || "Select an Employee"}
          </h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* --- SCROLLABLE CONTENT AREA --- */}
        <div className="custom-scrollbar flex-grow overflow-y-auto pr-6 pb-10">
          {" "}
          {/* pr-2 adds space for scrollbar */}
          <div className="select-none grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((emp) => (
              <Card
                onClick={() => handleCardClicked(emp.id)}
                key={emp.id}
                className={`shadow-md hover:shadow-lg transition cursor-pointer gap-3 ${
                  selectedEmployee === emp.id
                    ? "border-2 border-s-7  border-primary"
                    : ""
                }`}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="w-16 h-16 bg-primary border-4 border-foreground/50 shadow-inner shadow-background/50 rounded-full items-center justify-center flex text-3xl text-white">
                    <AvatarImage src={emp.profile_image_url || ""} />
                    <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{emp.name}</CardTitle>
                    <p className="text-sm text-gray-500">{emp.email}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>
                    🕒 Available Hours:{" "}
                    <span className="font-medium">{emp.available_hours}</span>
                  </p>
                  <p>
                    📊 Task Capacity:{" "}
                    <span className="font-medium">{emp.task_capacity}</span>
                  </p>
                  <p>
                    ✅ Status: <span className="font-medium">{emp.status}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* --- STICKY FOOTER --- */}
        <div className="flex flex-shrink-0 flex-row-reverse gap-2">
          <Button
            onClick={() => onConfirm(selectedEmployee)}
            className="mt-2 sm:mt-0"
            disabled={!selectedEmployee}
          >
            Confirm
          </Button>
          <Button variant="outline" onClick={onClose} className="mt-2 sm:mt-0">
            Cancel
          </Button>
          {/* Add a confirm button here and pass the selected employee to onConfirm */}
        </div>
      </div>
    </>
  );
}
