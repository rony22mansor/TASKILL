import { Calendar, Goal, Trash } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import useAxiosDelete from "@/Hooks/UseAxiosDelete";

export default function TaskCard({ task, onSelectTask, index }) {
  return (
    <Card
      onClick={() => onSelectTask(task)}
      className=" p-4 cursor-pointer   hover:bg-primary/10  rounded-md select-none flex-1  peer-hover:bg-destructive/30 "
    >
      <CardContent className="p-0">
        <div className="flex gap-x-5 items">
          <div className="text-muted-foreground flex items-center justify-center  ">{`${
            index + 1
          }`}</div>
          <div className="flex-1">{task.description}</div>
          <div className="self-end text-muted-foreground">
            <div className="flex gap-1  items-center">
              <Calendar className="size-4" />
              <div>{new Date(task.created_at).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
