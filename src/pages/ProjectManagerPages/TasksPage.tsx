import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import TasksListPage from "./TaskListPage";
import TaskDetailsPage from "./TaskDetailsPage";

export default function TasksPage({ setIsPageDirty, onNavigate }) {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="p-4 md:p-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-md  mb-6 font-bold">
        <nav>
          <ol className="flex items-start">
            <li>
              <button
                onClick={() => setSelectedTask(null)}
                className={` ${
                  !selectedTask
                    ? "text-foreground text-3xl font-bold"
                    : "text-muted-foreground hover:text-foreground cursor-pointer text-3xl font-bold"
                }`}
              >
                Tasks
              </button>
            </li>
            {selectedTask && (
              <>
                <li className="flex items-center gap-1.5">
                  <ChevronRight className=" text-muted-foreground" />
                  <span className=" text-foreground truncate max-w-2xl text-3xl font-bold">
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
