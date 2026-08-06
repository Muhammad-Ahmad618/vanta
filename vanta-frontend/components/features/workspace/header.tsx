"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">Workspaces</h1>
        <p className="text-sm text-muted-foreground/70">
          View and manage your created and joined workspaces. Click a workspace
          to open it and continue your work.
        </p>
      </div>
      <div>
        <Button className="rounded-lg cursor-pointer text-sm p-5" size={"lg"}>
          <CirclePlus /> Create Workspace
        </Button>
      </div>
    </div>
  );
}
