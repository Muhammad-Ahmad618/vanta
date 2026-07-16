"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { CreateTask } from "./createTask";

export function TaskHeader() {
  const [open, setOpen] = useState(false);

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
        <CreateTask open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
