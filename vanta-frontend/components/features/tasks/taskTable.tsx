"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/Task";
import { StatusLabel } from "@/components/custom/status-label";

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
  {
    id: "T-5",
    title: "Compliance Documentation",
    description: "Write compliance documentation",
    priority: "Medium",
    dueDate: "08/07/2026",
    assignee: "Sarah Chen",
    status: "Pending",
  },
];

const columns = [
  "id",
  "Title",
  "Description",
  "Priority",
  "Assignee",
  "Workspace",
  "Due Date",
  "Status",
  "Actions",
] as const;

interface TaskRowProps {
  task: Task;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function TaskRow({ task, onView, onEdit, onDelete }: TaskRowProps) {
  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="py-3 px-5">{task?.id}</TableCell>
      <TableCell className="py-3 px-5">{task.title}</TableCell>
      <TableCell className="py-3 px-5">{task.description || "-"}</TableCell>
      <TableCell className="py-3 px-5">
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
          {task?.priority}
        </Badge>
      </TableCell>
      <TableCell className="py-3 px-5">{task?.assignee || "-"}</TableCell>
      <TableCell className="py-3 px-5">{task?.workspace || "-"}</TableCell>
      <TableCell className="py-3 px-5">{task?.dueDate}</TableCell>
      <TableCell className="py-3 px-5">
        <StatusLabel status={task.status} />
      </TableCell>
      <TableCell className="py-3 px-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-md p-2">
            <DropdownMenuItem onClick={() => onView?.(task.id)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(task.id)}>
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(task.id)}>
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

interface TaskTableProps {
  data?: Task[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TaskTable({
  data = tasks,
  onView,
  onEdit,
  onDelete,
}: TaskTableProps) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            {columns.map((col) => (
              <TableHead key={col} className="p-5 font-semibold">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
