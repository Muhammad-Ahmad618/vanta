"use client";

import type { Workspace } from "@/types/workspace";
import { WorkspaceCard } from "./workspaceCard";

export const workspaces: Workspace[] = [
  {
    id: "ws-1",
    title: "Acme Inc.",
    description: "Product development and internal collaboration.",
    logo: "https://placehold.co/80x80/4F46E5/FFFFFF?text=A",
    members: 28,
    activeTasks: 24,
  },
  {
    id: "ws-2",
    title: "Design Studio",
    description: "UI/UX designs, branding, and creative assets.",
    logo: "https://placehold.co/80x80/EC4899/FFFFFF?text=D",
    members: 12,
    activeTasks: 41,
  },
  {
    id: "ws-3",
    title: "Marketing Team",
    description: "Campaign planning, content, and social media.",
    logo: "https://placehold.co/80x80/F59E0B/FFFFFF?text=M",
    members: 19,
    activeTasks: 67,
  },
  {
    id: "ws-4",
    title: "Engineering",
    description: "Backend, frontend, DevOps, and QA projects.",
    logo: "https://placehold.co/80x80/10B981/FFFFFF?text=E",
    members: 35,
    activeTasks: 21,
  },
];

export function WorkspaceList() {
  return (
    <div className="my-5">
      <div className="grid grid-cols-3 gap-5">
        {workspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      </div>
    </div>
  );
}
