"use client";

import { Card } from "@/components/ui/card";
import type { Workspace } from "@/types/workspace";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  Avatar,
  AvatarGroup,
  AvatarFallback,
  AvatarImage,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const calculatePercentage = (completedTasks: number) => {
  return (completedTasks / 75) * 100;
};

export function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  return (
    <div>
      <Card className="p-5 rounded-xl">
        <div>
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-lg bg-primary-light text-base text-primary flex items-center justify-center">
                {workspace?.title.slice(0, 2).toUpperCase()}
              </div>
              <Button className="bg-accent rounded-md p-2 hover:bg-accent/80 cursor-pointer">
                <MoreVertical className="text-secondary" size={18} />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{workspace?.title}</h3>
                <p className="text-sm text-zinc-500">
                  {workspace?.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <AvatarGroup>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {workspace?.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {workspace?.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {workspace?.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <AvatarGroupCount>+9</AvatarGroupCount>
                </AvatarGroup>
                <p className="text-sm text-zinc-500">
                  {workspace?.members} members
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground/80">
                    Active Tasks: {workspace?.activeTasks}
                  </span>
                  <p>
                    {Math.floor(calculatePercentage(workspace?.activeTasks))}%
                  </p>
                </div>
                <Progress
                  value={workspace?.activeTasks}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
