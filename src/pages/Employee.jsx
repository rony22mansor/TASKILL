"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock response (replace with your API hook later)
const initialEmployees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone_number: "+123456789",
    address: "123 Main St",
    task_capacity: 5,
    available_hours: 20,
    profile_image_url: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: [
      { skill_id: 1, name: "React", rating: 5 },
      { skill_id: 2, name: "Laravel", rating: 4 },
    ],
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone_number: "+987654321",
    address: "456 Side St",
    task_capacity: 4,
    available_hours: 15,
    profile_image_url: null,
    skills: [{ skill_id: 3, name: "Vue.js", rating: 5 }],
    status: "Inactive",
  },
];

const Employee = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (emp) => {
    setEditId(emp.id);
    setFormData({
      available_hours: emp.available_hours,
      task_capacity: emp.task_capacity,
      status: emp.status,
    });
  };

  const handleSave = (id) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...formData } : emp))
    );
    setEditId(null);
    console.log("Saved data:", formData); // Replace with API call
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Employees</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((emp) => (
          <Card key={emp.id} className="shadow-md hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="w-16 h-16">
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
                📞 <span className="text-gray-700">{emp.phone_number}</span>
              </p>
              <p>
                📍 <span className="text-gray-700">{emp.address}</span>
              </p>

              {editId === emp.id ? (
                <>
                  {/* Editable fields */}
                  <div>
                    🕒 Available Hours:
                    <Input
                      type="number"
                      value={formData.available_hours ?? ""}
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
                      value={formData.task_capacity ?? ""}
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
                      value={formData.status ?? "Active"}
                      onValueChange={(val) =>
                        setFormData({ ...formData, status: val })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  {/* Normal display mode */}
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
                </>
              )}

              <div>
                <p className="mb-1">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {emp.skills.map((skill) => (
                    <Badge key={skill.skill_id} variant="secondary">
                      {skill.name} ⭐{skill.rating}
                    </Badge>
                  ))}
                </div>
              </div>

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
                  onClick={() => console.log("Details for", emp.id)}
                >
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Employee;
