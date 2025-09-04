import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchEmployeeInfo,
  fetchEmployeeSkills,
} from "@/lib/api/admin_employee_api";
import { Button } from "@/components/ui/button";
import { Delete, Plus, Star, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  addSkillToEmployee,
  deleteSkillFromEmployee,
  updateSkillForEmployee,
} from "@/lib/api/employee_skills_api";
import { queryClient } from "@/main";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { editEmployeeInfo } from "@/lib/api/edit_employee_api";

const EmployeeDetailsDialog = ({ open, onOpenChange, id }) => {
  const {
    data: info,
    isLoading: infoLoading,
    error: infoError,
  } = useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const data = await fetchEmployeeInfo({ employeeId: id });
      return data;
    },
    refetchOnWindowFocus: false,
  });
  const {
    data: skills,
    isLoading: skillsLoading,
    error: skillsError,
  } = useQuery({
    queryKey: ["skills", id],
    queryFn: async () => {
      const data = await fetchEmployeeSkills({ employeeId: id });
      return data;
    },
    refetchOnWindowFocus: false,
  });

  // const { data, loading, error } = useAxiosGet(`admin/employees/${id}`);
  // const { skills, skillsLoading, skillsError } = useAxiosGet(
  //   `admin/employee-skills/${id}`
  // );
  if (!open) return null;

  if (infoLoading || skillsLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  if (infoError || !info || skillsError) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>Error loading employee details.</DialogContent>
      </Dialog>
    );
  }

  const { employee, tasks_summary } = info;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-full sm:max-w-5xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
        </DialogHeader>

        <div className="flex-grow flex flex-col md:flex-row gap-6 overflow-hidden pt-4">
          {/* Left Column */}
          <div className="w-full md:w-1/2 flex flex-col space-y-6 overflow-auto">
            <EmployeeInfo employee={employee} />
            <Skills employeeId={employee.id} initialSkills={skills} />
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/3 flex-grow flex flex-col">
            <TaskSummary tasks={tasks_summary} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EmployeeInfo = ({ employee }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    available_hours: employee?.available_hours || "",
    task_capacity: employee?.task_capacity || "",
    status: employee?.status || "available",
  });

  useEffect(() => {
    setFormData({
      available_hours: employee?.available_hours || "",
      task_capacity: employee?.task_capacity || "",
      status: employee?.status || "available",
    });
  }, [employee]);

  const editEmployeeInfoMutation = useMutation({
    mutationFn: editEmployeeInfo,
    onSuccess: (data) => {
      setIsEdit(false);
      toast.success("Employee Info Edited Successfully");
      queryClient.invalidateQueries({
        queryKey: ["info", employee.id],
      });
    },
    onError: (error) => {
      console.error("Failed to Edit Employee Info:", error);
    },
  });

  const handleSave = () => {
    // Make sure numbers are sent as numbers
    const payload = {
      ...formData,
      available_hours: Number(formData.available_hours),
      task_capacity: Number(formData.task_capacity),
    };
    console.log("payload ==> ", payload);
    editEmployeeInfoMutation.mutate({ body: payload, employeeId: employee.id });
  };

  const handleCancel = () => {
    setIsEdit(false);
    // Reset form to original data
    setFormData({
      available_hours: employee?.available_hours,
      task_capacity: employee?.task_capacity,
      status: employee?.status,
    });
  };

  return (
    <Card className="p-0 flex-shrink-0">
      <CardContent className="p-0">
        <div className="flex p-4 gap-4 items-center">
          <Avatar className="  w-16 h-16  bg-primary border-4 border-foreground/50 shadow-inner shadow-background/50 rounded-full items-center justify-center flex text-3xl text-white ">
            <AvatarImage src={employee.profile_image_url || ""} />
            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="truncate">{employee.name}</CardTitle>
            <p className="text-sm text-gray-500 truncate">{employee.email}</p>
          </div>
        </div>
        <div className="space-y-2 px-4">
          <p>
            📞 <span className="">{employee?.phone_number}</span>
          </p>
          <p>
            📍 <span className="">{employee?.address}</span>
          </p>
          {isEdit ? (
            <>
              <div className="flex items-center gap-2">
                <div className="text-nowrap w-2/3">🕒 Available Hours</div>
                <Input
                  value={formData.available_hours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      available_hours: e.target.value,
                    })
                  }
                  type="number"
                  className="mt-1 "
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-nowrap w-2/3">📊 Task Capacity</div>
                <Input
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      task_capacity: e.target.value,
                    })
                  }
                  value={formData.task_capacity}
                  type="number"
                  className="mt-1 "
                />
              </div>
              <div className="flex items-center gap-2 ">
                <div className="text-nowrap w-2/3">✅ Status</div>
                <Select
                  value={formData.status}
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
              <p>
                🕒 Available Hours:{" "}
                <span className="font-medium">{employee?.available_hours}</span>
              </p>
              <p>
                📊 Task Capacity:{" "}
                <span className="font-medium">{employee?.task_capacity}</span>
              </p>
              <p>
                ✅ Status:{" "}
                <span className="font-medium">{employee?.status}</span>
              </p>
            </>
          )}
        </div>
        <div className="justify-items-end pb-4 pr-4 mt-4">
          {isEdit ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                disabled={editEmployeeInfo.isPending}
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          ) : (
            <div className="flex">
              <Button onClick={() => setIsEdit(true)}>Edit</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Skills = ({ employeeId, initialSkills }) => {
  const [employeeSkills, setEmployeeSkills] = useState(initialSkills);
  const { data: allSkills, loading: isLoading, error } = useAxiosGet("skills");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [rating, setRating] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const addSkillMutation = useMutation({
    mutationFn: addSkillToEmployee,
    onSuccess: (data) => {
      toast.success("Skill Added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["skills", employeeId],
      });
      setSelectedSkill(null);
      setRating(1);
    },
    onError: (error) => {
      console.error("Failed to add skill:", error);
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: deleteSkillFromEmployee,
    onSuccess: (data) => {
      toast.success("Skill Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["skills", employeeId],
      });
      setSelectedSkill(null);
      setRating(1);
    },
    onError: (error) => {
      console.error("Failed to delete skill:", error);
    },
  });

  useEffect(() => {
    setEmployeeSkills(initialSkills);
  }, [initialSkills]);

  const updateSkillsMutation = useMutation({
    mutationFn: updateSkillForEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills", employeeId],
      });
    },
    onError: (error) => {
      console.error("Failed to update skills:", error);
      toast.error("Failed to update skills");
    },
  });
  const handleRatingChange = (skillId, newRating) => {
    console.log("skillId ==> ", skillId);
    console.log("newRating ==> ", newRating);
    updateSkillsMutation.mutate({
      employeeId: employeeId,
      skillId: skillId,
      rating: newRating,
    });
  };

  const handleDeleteSkill = (skillId) => {
    deleteSkillMutation.mutate({ employeeId: employeeId, skillId: skillId });
  };

  const handleAddSkill = () => {
    console.log(selectedSkill);
    console.log(rating);
    addSkillMutation.mutate({
      employeeId: employeeId,
      skill_id: selectedSkill,
      rating: rating,
    });
  };

  return (
    <Card className="p-0 flex-shrink-0 ">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center mb-3 justify-between">
          <h3 className="font-semibold text-lg">Skills</h3>
          {isEdit ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedSkill(null);
                  setIsEdit(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEdit(true)}>Edit</Button>
          )}
        </div>

        {isLoading ? (
          <p className="text-slate-400 text-sm">Loading skills...</p>
        ) : isEdit ? (
          <>
            <div className="flex gap-2 mb-3">
              {/* Add field */}
              <Button
                onClick={handleAddSkill}
                disabled={!selectedSkill}
                size="icon"
                variant="outline"
              >
                <Plus />
              </Button>
              <div className=" w-full">
                <Select
                  value={selectedSkill}
                  onValueChange={(val) => setSelectedSkill(val)}
                >
                  <SelectTrigger className=" w-full">
                    <SelectValue placeholder="Select Skill" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[40dvh] h-max">
                    {allSkills
                      .filter(
                        (skill) =>
                          !employeeSkills.some(
                            (empSkill) => empSkill.id === skill.id
                          )
                      )
                      .map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {selectedSkill && (
                  <div className="flex gap-2 items-start mt-1">
                    <div className="">Rating:</div>
                    <div className="w-full mt-3">
                      <Slider
                        onValueChange={(val) => setRating(val[0])}
                        defaultValue={[rating]}
                        max={5}
                        step={1}
                        className=""
                      />
                      <div className="flex justify-between px-1 mt-1 text-muted-foreground text-sm">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num}>{num}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Existing Skills List */}
            <div className="space-y-2">
              {employeeSkills?.length > 0 ? (
                employeeSkills.map((skill) => (
                  <Card key={skill.id} className="p-0">
                    <div className="flex justify-between px-3 py-2 gap-4">
                      <div className="w-full ">
                        <CardContent className="p-0">{skill.name}</CardContent>
                        <div className="w-full mt-3">
                          <Slider
                            onValueChange={(val) =>
                              handleRatingChange(skill.id, val[0])
                            }
                            defaultValue={[skill.rating]}
                            max={5}
                            step={1}
                            className=""
                          />
                          <div className="flex justify-between px-1 mt-1 text-muted-foreground text-sm">
                            {[0, 1, 2, 3, 4, 5].map((num) => (
                              <div key={num}>{num}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDeleteSkill(skill.id)}
                        size="icon"
                        variant="outline"
                        className="text-destructive hover:bg-destructive/20"
                      >
                        <Trash />
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-slate-500 text-sm  py-4">
                  No skills assigned.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-3">
            {initialSkills.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-2">
                No skills assigned.
              </p>
            ) : (
              initialSkills.map((skill) => (
                <Card key={skill.id} className="p-0 select-none">
                  <CardContent className="px-3 py-2">
                    <div className="flex gap-4 items-center">
                      {skill.name}
                      <div className="flex gap-0.5 items-center text-muted-foreground">
                        {skill.rating}
                        <Star className="size-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const TaskSummary = ({ tasks }) => (
  <Card className="p-0 flex-grow flex flex-col overflow-auto">
    <CardContent className="space-y-3 p-4 flex flex-col flex-grow">
      <h3 className="font-semibold text-lg flex-shrink-0">Tasks Summary</h3>
      <div className="overflow-y-auto flex-grow pr-2">
        {tasks?.length > 0 ? (
          tasks.map((task, idx) => (
            <div
              key={idx}
              className="border shadow-sm p-3 rounded-lg space-y-2 mb-2"
            >
              <p className="text-md font-bold">
                {task.parent_task?.description || "N/A"}
              </p>
              <div>
                <ul className=" list-disc ml-12">
                  {task.assigned_subtasks?.length > 0 ? (
                    task.assigned_subtasks.map((sub) => (
                      <li key={sub.id}>{sub.description}</li>
                    ))
                  ) : (
                    <li className="text-gray-500 list-none">
                      No subtasks assigned
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No tasks assigned.</p>
        )}
      </div>
    </CardContent>
  </Card>
);

export default EmployeeDetailsDialog;
