"use client";

import { Card } from "@/components/ui/card";
import type { Workspace } from "@/types/workspace";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  BriefcaseBusiness,
  LogOut,
  UserPlus,
} from "lucide-react";
import {
  Avatar,
  AvatarGroup,
  AvatarFallback,
  AvatarImage,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const calculatePercentage = (completedTasks: number) => {
  return (completedTasks / 75) * 100;
};

export function WorkspaceCard({
  workspace,
  onLeave,
}: {
  workspace: Workspace;
  onLeave: (workspace: Workspace) => void;
}) {
  return (
    <div>
      <Card className="p-5 rounded-xl">
        <div>
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-lg bg-primary-light text-base text-primary flex items-center justify-center">
                {workspace?.title.slice(0, 2).toUpperCase()}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-accent/80 rounded-md p-2 hover:bg-primary-light cursor-pointer">
                    <MoreVertical className="text-secondary" size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-md p-3 w-44 space-y-2"
                >
                  <DropdownMenuItem className="cursor-pointer hover:rounded-sm">
                    <BriefcaseBusiness className="mr-2 h-4 w-4" />
                    Enter Workspace
                  </DropdownMenuItem>
                  {workspace?.admin && (
                    <>
                      <DropdownMenuItem className="cursor-pointer hover:rounded-sm">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite Member
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer hover:rounded-sm text-destructive"
                    onClick={() => onLeave(workspace)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Leave Workspace
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <h3 className="text-lg font-semibold">{workspace?.title}</h3>
                  {workspace?.admin && (
                    <span className="text-xs text-muted-foreground">
                      (Admin)
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-500 mt-1">
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
