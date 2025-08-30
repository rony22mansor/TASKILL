"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import useAxiosPut from "@/Hooks/UseAxiosPut";

const Profilepage = () => {
  const { data, loading } = useAxiosGet("employee/profile");
  const [profile, setProfile] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const { putData } = useAxiosPut("");

  useEffect(() => {
    if (data) {
      setProfile(data);
      // ✅ Show existing profile image if API returns it
      if (data.profile_image_url) {
        setImagePreview(data.profile_image_url);
      }
    }
  }, [data]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setEditedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Instead of FormData, convert image → base64 string for JSON
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedFields((prev) => ({
          ...prev,
          profile_image: reader.result, // base64 string
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // ✅ Send only edited fields as plain JSON
    console.log("Updated Profile (only edited fields):", editedFields);

    putData(editedFields, "employee/profile");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center my-10">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image */}
          <div className="space-y-2">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={profile?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={profile?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              value={profile?.phone_number || ""}
              onChange={(e) => handleChange("phone_number", e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea
              value={profile?.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          {/* Birth Date */}
          <div className="space-y-2">
            <Label>Birth Date</Label>
            <Input
              type="date"
              value={profile?.birth_date || ""}
              onChange={(e) => handleChange("birth_date", e.target.value)}
            />
          </div>

          {/* Task Capacity */}
          <div className="space-y-2">
            <Label>Task Capacity</Label>
            <Input
              type="number"
              value={profile?.task_capacity || ""}
              onChange={(e) =>
                handleChange("task_capacity", Number(e.target.value))
              }
            />
          </div>

          {/* Available Hours */}
          <div className="space-y-2">
            <Label>Available Hours</Label>
            <Input
              type="number"
              value={profile?.available_hours || ""}
              onChange={(e) =>
                handleChange("available_hours", Number(e.target.value))
              }
            />
          </div>

          {/* Skills (read-only) */}
          <div className="space-y-2">
            <Label>Skills</Label>
            <ul className="list-disc pl-6">
              {profile?.skills?.map((skill) => (
                <li key={skill?.skill_id}>
                  {skill?.name} (Rating: {skill?.rating}/5)
                </li>
              ))}
            </ul>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profilepage;
