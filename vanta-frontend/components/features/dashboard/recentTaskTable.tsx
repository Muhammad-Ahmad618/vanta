import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusLabel } from "@/components/custom/status-label";
import { Task } from "@/types/Task";

const tasks: Task[] = [
  {
    id: "T-1",
    title: "Payment Gateway Integration",
    description: "Integrate Stripe payment gateway",
    priority: "High",
    dueDate: "29/06/2026",
    assignee: "James Smith",
    status: "Pending",
    workspace: "Workspace 1",
  },
  {
    id: "T-2",
    title: "User Authentication Bugfix",
    description: "Fix user authentication bug",
    priority: "Medium",
    dueDate: "30/06/2026",
    assignee: "Eddie Lake",
    status: "In Process",
    workspace: "Workspace 2",
  },
  {
    id: "T-3",
    title: "Executive Summary Narrative",
    description: "Write executive summary",
    priority: "High",
    dueDate: "02/07/2026",
    assignee: "Eddie Lake",
    status: "Done",
  },
  {
    id: "T-4",
    title: "Design System Implementation",
    description: "Implement design system",
    priority: "Low",
    dueDate: "05/07/2026",
    status: "In Process",
    workspace: "Workspace 2",
  },
];

export function RecentTaskTable() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold tracking-tight">Recent Tasks</h2>
      </div>
      <div className="rounded-xl border border-border overflow-hidden bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5 font-semibold w-14">Id</TableHead>
              <TableHead className="px-5 font-semibold">Title</TableHead>
              <TableHead className="px-4 font-semibold">Description</TableHead>
              <TableHead className="px-4 font-semibold">Priority</TableHead>
              <TableHead className="px-4 font-semibold">Due Date</TableHead>
              <TableHead className="px-4 font-semibold">Assignee</TableHead>
              <TableHead className="px-4 font-semibold">Workspace</TableHead>
              <TableHead className="px-4 font-semibold">Status</TableHead>
              <TableHead className="pr-5 text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task, idx) => (
              <TableRow key={idx} className="hover:bg-muted/20">
                <TableCell className="px-5 py-3 text-muted-foreground font-medium">
                  {idx + 1}
                </TableCell>
                <TableCell className="font-medium px-5 py-3">
                  {task.title}
                </TableCell>
                <TableCell className="px-4 py-3">
                  {task.description || "-"}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge
                    variant={
                      task.priority === "High"
                        ? "destructive"
                        : task.priority === "Medium"
                          ? "default"
                          : "secondary"
                    }
                    className="rounded-md"
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-muted-foreground">
                  {task.dueDate}
                </TableCell>
                <TableCell className="px-4 py-3">{task.assignee}</TableCell>
                <TableCell className="px-4 py-3">{task.workspace}</TableCell>
                <TableCell className="px-4 py-3">
                  <StatusLabel status={task?.status} />
                </TableCell>
                <TableCell className="pr-5 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-md"
                      >
                        <EllipsisVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Mark as Done</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
