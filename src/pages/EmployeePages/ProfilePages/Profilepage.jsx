"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import useAxiosPut from "@/Hooks/UseAxiosPut";

const Profilepage = () => {
  const { data, loading } = useAxiosGet("employee/profile");
  const { putData } = useAxiosPut("employee/profile");

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setProfile(data);
      setFormData({
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        address: data.address,
        birth_date: data.birth_date,
        task_capacity: data.task_capacity,
        available_hours: data.available_hours,
        status: data.status,
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    putData(formData).then((res) => {
      console.log("Updated:", res);
      setProfile(formData);
      setEditMode(false);
    });
  };

  if (loading || !profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex justify-center my-10">
      <Card className="w-full max-w-3xl shadow-lg hover:shadow-xl transition rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile?.profile_image_url || ""} />
            <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-bold">
              {profile?.name}
            </CardTitle>
            <p className="text-gray-500">{profile?.email}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {editMode ? (
            <>
              <div>
                🧑 Name:
                <Input
                  value={formData?.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                📧 Email:
                <Input
                  type="email"
                  value={formData?.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                📞 Phone:
                <Input
                  value={formData?.phone_number || ""}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                📍 Address:
                <Textarea
                  value={formData?.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                🎂 Birth Date:
                <Input
                  type="date"
                  value={formData?.birth_date || ""}
                  onChange={(e) => handleChange("birth_date", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                🕒 Available Hours:
                <Input
                  type="number"
                  value={formData?.available_hours ?? ""}
                  onChange={(e) =>
                    handleChange("available_hours", Number(e.target.value))
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
                    handleChange("task_capacity", Number(e.target.value))
                  }
                  className="mt-1"
                />
              </div>
            </>
          ) : (
            <>
              <p>
                📞 Phone:{" "}
                <span className="font-medium">{profile?.phone_number}</span>
              </p>
              <p>
                📞 Email: <span className="font-medium">{profile?.email}</span>
              </p>
              <p>
                📍 Address:{" "}
                <span className="font-medium">{profile?.address}</span>
              </p>
              <p>
                🎂 Birth Date:{" "}
                <span className="font-medium">{profile?.birth_date}</span>
              </p>
              <p>
                🕒 Available Hours:{" "}
                <span className="font-medium">{profile?.available_hours}</span>
              </p>
              <p>
                📊 Task Capacity:{" "}
                <span className="font-medium">{profile?.task_capacity}</span>
              </p>
              <p>
                ✅ Status:{" "}
                <span className="font-medium">{profile?.status}</span>
              </p>
            </>
          )}

          <div>
            <p className="mb-1">💡 Skills:</p>
            <div className="flex flex-wrap gap-2">
              {profile?.skills?.map((skill) => (
                <Badge key={skill.skill_id} variant="secondary">
                  {skill.name} ⭐{skill.rating}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            {editMode ? (
              <Button size="sm" variant="default" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button
                size="sm"
                variant="default"
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profilepage;
