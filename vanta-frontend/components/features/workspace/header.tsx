"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { WorkspaceSheet } from "./workspaceSheet";
import { useState } from "react";

export function Header() {
  const [openSheet, setOpenSheet] = useState<boolean>(false);
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
        <Button
          onClick={() => {
            setOpenSheet(true);
          }}
          className="rounded-lg cursor-pointer text-sm p-4"
          size={"lg"}
        >
          <CirclePlus /> Create Workspace
        </Button>
      </div>

      <WorkspaceSheet open={openSheet} setOpen={setOpenSheet} />
    </div>
  );
}
