import { Bot, Goal } from "lucide-react";
import React from "react";

export default function Greeting() {
  return (
    <div className="flex-0 flex flex-col items-center justify-center">
      <div className="p-2  rounded-full ">
        <Goal className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-3xl font-black font-brand text-primary">TASKILL</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-lg">
        Let&apos;s start a new task. Please describe the main task you&apos;d
        like to create.
      </p>
    </div>
  );
}
