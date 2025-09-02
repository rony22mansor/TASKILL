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

const Employee = () => {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { data, loading: isLoading, error } = useAxiosGet("admin/employees");
  const { putData, success } = useAxiosPut("admin/employees/");

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["fetchData", "admin/employees"],
    });
    queryClient.invalidateQueries({
      queryKey: ["fetchData", `admin/employees/${selectedEmployee}`],
    });
  }, [success, selectedEmployee]);

  const handleEdit = (emp) => {
    setEditId(emp.id);
    setFormData({
      available_hours: emp.available_hours,
      task_capacity: emp.task_capacity,
      status: emp.status,
    });
  };

  const handleSave = (id) => {
    setEditId(null);
    console.log("Saved data:", formData);
    putData(formData, `${id}`, [["fetchData", "/admin/employees"]]);
  };

  const handleDetails = (emp) => {
    setSelectedEmployee(emp.id);
    setDialogOpen(true);
  };

  console.log("isLoading ==> ", isLoading);
  if (isLoading) {
    return <h1>Loading ...</h1>;
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

              {/* 👇 ADD flex-1 and min-w-0 HERE */}
              <div className="flex-1 min-w-0">
                {/* 👇 ADD truncate HERE */}
                <CardTitle className="truncate">{emp.name}</CardTitle>
                {/* 👇 AND ADD truncate HERE */}
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

              {editId === emp?.id ? (
                <>
                  {/* Editable fields */}
                  <div>
                    🕒 Available Hours:
                    <Input
                      type="number"
                      value={formData?.available_hours ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          available_hours: Number(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    📊 Task Capacity:
                    <Input
                      type="number"
                      value={formData?.task_capacity ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          task_capacity: Number(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    ✅ Status:
                    <Select
                      value={formData.status ?? "available"}
                      onValueChange={(val) =>
                        setFormData({ ...formData, status: val })
                      }
                    >
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="unavailable">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  {/* Normal display mode */}
                  <p>
                    🕒 Available Hours:{" "}
                    <span className="font-medium">{emp?.available_hours}</span>
                  </p>
                  <p>
                    📊 Task Capacity:{" "}
                    <span className="font-medium">{emp?.task_capacity}</span>
                  </p>
                  <p>
                    ✅ Status:{" "}
                    <span className="font-medium">{emp?.status}</span>
                  </p>
                </>
              )}

              {/* <div>
                <p className="mb-1">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {emp?.skills?.map((skill) => (
                    <Badge key={skill.skill_id} variant="secondary">
                      {skill.name} ⭐{skill.rating}
                    </Badge>
                  ))}
                </div>
              </div> */}

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-4">
                {editId === emp.id ? (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleSave(emp.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDetails(emp)}
                >
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      {selectedEmployee && (
        <EmployeeDetailsDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          id={selectedEmployee}
        />
      )}
    </div>
  );
};

export default Employee;
