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
import { EllipsisVertical, CheckCircle2, CircleDot, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tasks = [
  {
    title: "Payment Gateway Integration",
    priority: "High",
    dueDate: "29/06/2026",
    assignee: "James Smith",
    status: "Pending",
  },
  {
    title: "User Authentication Bugfix",
    priority: "Medium",
    dueDate: "30/06/2026",
    assignee: "Eddie Lake",
    status: "In Process",
  },
  {
    title: "Executive Summary Narrative",
    priority: "High",
    dueDate: "02/07/2026",
    assignee: "Eddie Lake",
    status: "Done",
  },
  {
    title: "Design System Implementation",
    priority: "Low",
    dueDate: "05/07/2026",
    assignee: "Maya Johnson",
    status: "In Process",
  },
  {
    title: "Compliance Documentation",
    priority: "Medium",
    dueDate: "08/07/2026",
    assignee: "Sarah Chen",
    status: "Pending",
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
              <TableHead className="px-5 font-semibold">Title</TableHead>
              <TableHead className="px-4 font-semibold">Priority</TableHead>
              <TableHead className="px-4 font-semibold">Due Date</TableHead>
              <TableHead className="px-4 font-semibold">Assignee</TableHead>
              <TableHead className="px-4 font-semibold">Status</TableHead>
              <TableHead className="pr-5 text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task, idx) => (
              <TableRow key={idx} className="hover:bg-muted/20">
                <TableCell className="font-medium px-5 py-3">
                  {task.title}
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
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {task.status === "Done" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : task.status === "In Process" ? (
                      <CircleDot className="h-4 w-4 text-blue-500 animate-pulse shrink-0" />
                    ) : (
                      <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                    )}
                    <span className="text-xs font-medium">{task.status}</span>
                  </div>
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
