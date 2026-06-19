import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export function TaskHeader() {
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
        >
          <CirclePlus /> Add Task
        </Button>
      </div>
    </div>
  );
}
