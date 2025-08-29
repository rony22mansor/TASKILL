import {
  UserCheck,
  CheckCircle,
  Briefcase,
  Star,
  BarChart2,
  MessageCirclePlus,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function AssignmentCard({ assignment, onFeedbackClick }) {
  return (
    <div className="bg-card border-s-10 border-s-primary text-card-foreground border rounded-lg shadow-sm relative">
      {/* Card Header */}
      <div className="flex flex-col space-y-1.5 p-6 pe-16">
        <h3 className="text-lg font-semibold leading-normal tracking-tight">
          {assignment.sub_task_description}
        </h3>
      </div>
      {/* Card Content */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="flex items-center gap-3">
          <UserCheck className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Assigned To</p>
            <p className="font-medium text-sm">{assignment.employee_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle
            className={`w-5 h-5 ${
              assignment.availability ? "text-green-500" : "text-red-500"
            }`}
          />
          <div>
            <p className="text-xs text-muted-foreground">Availability</p>
            <p className="font-medium text-sm">
              {assignment.availability ? "Available" : "Unavailable"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Current Load</p>
            <p className="font-medium text-sm">
              {assignment.current_load} tasks
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Star className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Avg. Skill Level</p>
            <p className="font-medium text-sm">
              {assignment.avg_skill_level.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      {/* Card Footer */}
      <div className="flex items-end p-6 pt-0 justify-end">
        <div className="flex items-center gap-2 text-md text-muted-foreground">
          <BarChart2 className="w-6 h-6" />
          <span>
            Match Score:{" "}
            <strong className="font-semibold text-foreground">
              {(assignment.match_score * 100).toFixed(1)}%
            </strong>
          </span>
        </div>
      </div>
      <Button
        onClick={() => onFeedbackClick(assignment)}
        variant="outline"
        size="icon"
        className=" absolute top-4 right-4"
      >
        <MessageCirclePlus />
      </Button>
    </div>
  );
}
