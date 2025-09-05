"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmployeeDetailsDialog from "./EmployeeDetailsDialog";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import useAxiosPut from "@/Hooks/UseAxiosPut";
import EmployeesListEmpty from "@/components/employee_components/EmployeesListEmpty";
import { queryClient } from "@/main";
import EmployeeCardLoading from "@/components/employee_components/EmployeeCardLoading";

const Employee = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const { data, loading: isLoading, error } = useAxiosGet("admin/employees");

  // This effect can be simplified or moved if it's only for the dialog
  useEffect(() => {
    // This will refetch the employee list when the dialog signals a change.
    queryClient.invalidateQueries({
      queryKey: ["fetchData", "admin/employees"],
    });
  }, [dialogOpen]); // A simple dependency on dialogOpen can trigger refetch after it closes

  const handleDetails = (empId) => {
    setSelectedEmployeeId(empId);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Employees</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, , 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((e, i) => (
            <EmployeeCardLoading key={i} />
          ))}
        </div>

        {/* Details Dialog */}
        {selectedEmployeeId && (
          <EmployeeDetailsDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            id={selectedEmployeeId}
          />
        )}
      </div>
    );
  }

  if (!isLoading && !error && (!data || data.length === 0)) {
    return (
      <div className="flex h-full flex-col items-center justify-center ">
        <EmployeesListEmpty />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Employees</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((emp) => (
          <Card key={emp?.id} className="shadow-md hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="w-16 h-16 flex-shrink-0 bg-primary border-4 border-foreground/50 shadow-inner shadow-background/50 rounded-full items-center justify-center flex text-3xl text-white">
                <AvatarImage src={emp.profile_image_url || ""} />
                <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <CardTitle className="truncate">{emp.name}</CardTitle>
                <p className="text-sm text-gray-500 truncate">{emp.email}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                📞 <span className="">{emp?.phone_number}</span>
              </p>
              <p>
                📍 <span className="">{emp?.address}</span>
              </p>
              <p>
                🕒 Available Hours:{" "}
                <span className="font-medium">{emp?.available_hours}</span>
              </p>
              <p>
                📊 Task Capacity:{" "}
                <span className="font-medium">{emp?.task_capacity}</span>
              </p>
              <p>
                ✅ Status: <span className="font-medium">{emp?.status}</span>
              </p>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <Button size="sm" onClick={() => handleDetails(emp.id)}>
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      {selectedEmployeeId && (
        <EmployeeDetailsDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          id={selectedEmployeeId}
        />
      )}
    </div>
  );
};

export default Employee;
