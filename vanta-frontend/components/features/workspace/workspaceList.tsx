"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import type { Workspace } from "@/types/workspace";
import { WorkspaceCard } from "./workspaceCard";
import { Button } from "@/components/ui/button";

export const workspaces: Workspace[] = [
  {
    id: "ws-1",
    title: "Acme Inc.",
    description: "Product development and internal collaboration.",
    logo: "https://placehold.co/80x80/4F46E5/FFFFFF?text=A",
    members: 28,
    activeTasks: 24,
    admin: true,
  },
  {
    id: "ws-2",
    title: "Design Studio",
    description: "UI/UX designs, branding, and creative assets.",
    logo: "https://placehold.co/80x80/EC4899/FFFFFF?text=D",
    members: 12,
    activeTasks: 41,
    admin: false,
  },
  {
    id: "ws-3",
    title: "Marketing Team",
    description: "Campaign planning, content, and social media.",
    logo: "https://placehold.co/80x80/F59E0B/FFFFFF?text=M",
    members: 19,
    activeTasks: 67,
    admin: false,
  },
  {
    id: "ws-4",
    title: "Engineering",
    description: "Backend, frontend, DevOps, and QA projects.",
    logo: "https://placehold.co/80x80/10B981/FFFFFF?text=E",
    members: 35,
    activeTasks: 21,
    admin: false,
  },
];

export function WorkspaceList() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [workspaceToLeave, setWorkspaceToLeave] = useState<Workspace | null>(
    null,
  );

  const handleLeaveClick = (workspace: Workspace) => {
    setWorkspaceToLeave(workspace);
    setOpenDialog(true);
  };
  return (
    <>
      <div className="my-5">
        <div className="grid grid-cols-3 gap-5">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              onLeave={handleLeaveClick}
            />
          ))}
        </div>
      </div>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Workspace !</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to Leave{" "}
              <span className="text-primary">{workspaceToLeave?.title}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => setOpenDialog(false)}
              className="rounded-sm cursor-pointer"
            >
              Leave
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
