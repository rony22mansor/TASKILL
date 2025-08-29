import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Star,
  UserCheck,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function FeedbackDialog({
  isOpen,
  assignment,
  onClose,
  onSubmit,
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    // Reset rating when a new assignment is selected
    if (isOpen) {
      setRating(0);
      setHoverRating(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(assignment.id, rating);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80" />
      <div className="fixed left-1/2 top-1/2 z-50 grid rounded-lg w-2xl -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg ">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold">Rate this Assignment</h2>
          <div className="flex flex-col space-y-2 text-start">
            <div className="flex items-center justify-center gap-2 text-center text-sm font-medium text-foreground my-2 p-3 bg-muted/50 rounded-lg">
              <span className="flex-1 text-lg text-start">
                {assignment?.sub_task_description}
              </span>
              <ArrowRight className="h-8 w-8 flex-shrink-0 " />
              <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <p className="font-medium text-sm">
                      {assignment.employee_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle
                    className={`w-5 h-5 ${
                      assignment.availability
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Availability
                    </p>
                    <p className="font-medium text-sm">
                      {assignment.availability ? "Available" : "Unavailable"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Current Load
                    </p>
                    <p className="font-medium text-sm">
                      {assignment.current_load} tasks
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Avg. Skill Level
                    </p>
                    <p className="font-medium text-sm">
                      {assignment.avg_skill_level.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                rating >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
