import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import TasksListPage from "./TaskListPage";
import TaskDetailsPage from "./TaskDetailsPage";

export default function TasksPage({ setIsPageDirty, onNavigate }) {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="p-4 md:p-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-md mb-4">
        <nav>
          <ol className="flex items-center gap-1.5">
            <li>
              <button
                onClick={() => setSelectedTask(null)}
                className={`font-medium ${
                  !selectedTask
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground cursor-pointer"
                }`}
              >
                Tasks
              </button>
            </li>
            {selectedTask && (
              <>
                <li className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-medium text-foreground truncate max-w-xs md:max-w-md">
                    {selectedTask.description}
                  </span>
                </li>
              </>
            )}
          </ol>
        </nav>
      </div>

      {/* Content Area */}
      {!selectedTask ? (
        <TasksListPage onSelectTask={setSelectedTask} onNavigate={onNavigate} />
      ) : (
        <TaskDetailsPage task={selectedTask} />
      )}
    </div>
  );
}
