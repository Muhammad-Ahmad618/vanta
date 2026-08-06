"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { TaskSheet } from "./taskSheet";
import { Task } from "@/types/task";

export function TaskHeader() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (values: Task) => {
    console.log(values);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">Tasks</h1>
        <p className="text-sm text-zinc-500">
          Manage your tasks, deadlines, and priorities
        </p>
      </div>
      <div>
        <Button
          className="rounded-lg cursor-pointer text-sm px-5 py-4"
          size={"lg"}
          onClick={() => setOpen(true)}
        >
          <CirclePlus /> Add Task
        </Button>
        <TaskSheet
          open={open}
          setOpen={setOpen}
          onSubmitHandler={handleSubmit}
        />
      </div>
    </div>
  );
}
