import { Check, Cross, Pencil, Plus, Trash2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useAxiosGet from "@/Hooks/UseAxiosGet";
import SkillsListEmpty from "@/components/skills_components/SkillsListEmpty";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addSkill, deleteSkill, updateSkill } from "@/lib/api/skills_api";
import { queryClient } from "@/main";

export default function SkillsPage({ setIsPageDirty }) {
  const [newSkillName, setNewSkillName] = useState("");
  const [editingSkill, setEditingSkill] = useState(null); // Tracks { id: number, name: string }
  const editInputRef = useRef(null);

  const {
    data,
    loading: isLoading,
    error,
    isEmpty,
  } = useAxiosGet("admin/skills");

  const addSkillMutation = useMutation({
    mutationFn: addSkill,
    onSuccess: (data) => {
      toast.success("Skill Added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["fetchData", "admin/skills"],
      });
      setNewSkillName("");
    },
    onError: (error) => {
      console.error("Failed to add skill:", error);
      // Here you could show an error toast
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: deleteSkill,
    onSuccess: (data) => {
      toast.success("Skill Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["fetchData", "admin/skills"],
      });
      setNewSkillName("");
    },
    onError: (error) => {
      console.error("Failed to delete skill:", error);
      // Here you could show an error toast
    },
  });

  const updateSkillMutation = useMutation({
    mutationFn: updateSkill,
    onSuccess: (data) => {
      toast.success("Skill Updated Successfully");

      queryClient.invalidateQueries({
        queryKey: ["fetchData", "admin/skills"],
      });
      setNewSkillName("");
    },
    onError: (error) => {
      console.error("Failed to update skill:", error);
      // Here you could show an error toast
    },
  });

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) {
      toast.warning("Skill name cannot be empty.");
      return;
    }
    addSkillMutation.mutate(newSkillName);
  };

  const handleUpdateSkill = async (skillid) => {
    setEditingSkill(null);
    updateSkillMutation.mutate({
      name: editInputRef.current.value,
      skillId: skillid,
    });
  };

  const handleDeleteSkill = async (skillId) => {
    if (!skillId) return;

    deleteSkillMutation.mutate({ skillId: skillId });
  };

  const handleEditClick = (skill) => {
    setEditingSkill({ ...skill });
  };

  const handleEditKeyDown = (e, skillId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateSkill(skillId);
    } else if (e.key === "Escape") {
      setEditingSkill(null);
    }
  };

  if (!isLoading && !error && (!data || data.length === 0)) {
    return (
      <div className="flex  flex-col items-center justify-center ">
        <SkillsListEmpty />
      </div>
    );
  }

  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Skills</h1>
      <Card className="mb-4 p-3">
        <CardContent className="p-0">
          <div>
            <form onSubmit={handleAddSkill} className="flex gap-4">
              <Button size="icon">
                <Plus className="size-6" />
              </Button>
              <Input
                value={newSkillName}
                className="bg-muted"
                onChange={(e) => setNewSkillName(e.target.value)}
              />
            </form>
          </div>
        </CardContent>
      </Card>
      {!isLoading && (
        <div className="flex flex-wrap gap-3">
          {data.map((skill) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <Card key={skill.id} className="p-0 select-none cursor-pointer">
                  {editingSkill?.id === skill.id ? (
                    <div
                      key={skill.id}
                      className="flex items-center px-3 py-3 gap-2"
                    >
                      <Input
                        ref={editInputRef}
                        value={editingSkill.name}
                        onChange={(e) =>
                          setEditingSkill({
                            ...editingSkill,
                            name: e.target.value,
                          })
                        }
                        onKeyDown={(e) => handleEditKeyDown(e, skill.id)}
                        onBlur={() => setEditingSkill(null)}
                        className="text-sm h-6"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-6 bg-green-500/20"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleUpdateSkill(skill.id);
                        }}
                      >
                        <Check className="h-5 w-5 text-green-500 " />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-6 bg-destructive/20"
                        onMouseDown={(e) => {
                          setEditingSkill(null);
                        }}
                      >
                        <X className="h-5 w-5 text-destructive" />
                      </Button>
                    </div>
                  ) : (
                    <CardContent className="px-5 py-3">
                      {skill.name}
                    </CardContent>
                  )}
                </Card>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onSelect={() => handleEditClick(skill)}
                  className="cursor-pointer"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </ContextMenuItem>
                <ContextMenuItem
                  onSelect={() => handleDeleteSkill(skill.id)}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      )}
    </div>
  );
}
