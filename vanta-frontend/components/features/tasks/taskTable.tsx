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

type Priority = "High" | "Medium" | "Low";
type Status = "Pending" | "In Process" | "Done";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  assignee?: string;
  status: Status;
  workspace?: string;
}

const tasks: Task[] = [
  {
    id: "task-1",
    title: "Payment Gateway Integration",
    description: "Integrate Stripe payment gateway",
    priority: "High",
    dueDate: "29/06/2026",
    assignee: "James Smith",
    status: "Pending",
    workspace: "Workspace 1",
  },
  {
    id: "task-2",
    title: "User Authentication Bugfix",
    description: "Fix user authentication bug",
    priority: "Medium",
    dueDate: "30/06/2026",
    assignee: "Eddie Lake",
    status: "In Process",
    workspace: "Workspace 2",
  },
  {
    id: "task-3",
    title: "Executive Summary Narrative",
    description: "Write executive summary",
    priority: "High",
    dueDate: "02/07/2026",
    assignee: "Eddie Lake",
    status: "Done",
  },
  {
    id: "task-4",
    title: "Design System Implementation",
    description: "Implement design system",
    priority: "Low",
    dueDate: "05/07/2026",
    status: "In Process",
    workspace: "Workspace 2",
  },
  {
    id: "task-5",
    title: "Compliance Documentation",
    description: "Write compliance documentation",
    priority: "Medium",
    dueDate: "08/07/2026",
    assignee: "Sarah Chen",
    status: "Pending",
  },
];

const columns = [
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
      <TableCell className="py-3 px-5">{task.title}</TableCell>
      <TableCell className="py-3 px-5">{task.description || "-"}</TableCell>
      <TableCell className="py-3 px-5">{task.priority}</TableCell>
      <TableCell className="py-3 px-5">{task.assignee || "-"}</TableCell>
      <TableCell className="py-3 px-5">{task.workspace || "-"}</TableCell>
      <TableCell className="py-3 px-5">{task.dueDate}</TableCell>
      <TableCell className="py-3 px-5">{task.status}</TableCell>
      <TableCell className="py-3 px-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
              <TableHead key={col} className="p-5">
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
