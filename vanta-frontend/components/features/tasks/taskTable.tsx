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
import { Tasks, TaskTableProps } from "@/types/task";
import { StatusLabel } from "@/components/custom/status-label";

export const initialTasks: Tasks[] = [
  {
    task_id: 1,
    title: "Payment Gateway Integration",
    description: "Integrate Stripe payment gateway",
    priority: "high",
    due_date: "2026-06-29",
    assignee_name: "James Smith",
    status: "pending",
    workspace_name: "Workspace 1",
  },
  {
    task_id: 2,
    title: "User Authentication Bugfix",
    description: "Fix user authentication bug",
    priority: "medium",
    due_date: "2026-06-30",
    assignee_name: "Eddie Lake",
    status: "in_progress",
    workspace_name: "Workspace 2",
  },
  {
    task_id: 3,
    title: "Executive Summary Narrative",
    description: "Write executive summary",
    priority: "high",
    due_date: "2026-07-02",
    assignee_name: "Eddie Lake",
    status: "completed",
  },
  {
    task_id: 4,
    title: "Design System Implementation",
    description: "Implement design system",
    priority: "low",
    due_date: "2026-07-15",
    status: "in_progress",
  },
  {
    task_id: 5,
    title: "Compliance Documentation",
    description: "Write compliance documentation",
    priority: "medium",
    due_date: "2026-08-20",
    assignee_name: "Sarah Chen",
    status: "pending",
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
  task: Tasks;
  onView?: (task: Tasks) => void;
  onEdit?: (id: Tasks) => void;
  onDelete?: (id: Tasks) => void;
}

function TaskRow({ task, onView, onEdit, onDelete }: TaskRowProps) {
  return (
    <TableRow
      className="hover:bg-muted/20 text-[13px] overflow-hidden
    "
    >
      <TableCell className="py-3 px-5 whitespace-nowrap">
        {task?.task_id}
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        {task.title}
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        {task.description || "-"}
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        <Badge
          variant={
            task.priority === "high"
              ? "destructive"
              : task.priority === "medium"
                ? "default"
                : "secondary"
          }
          className="rounded-md"
        >
          {task?.priority}
        </Badge>
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        {task?.assignee_name || "-"}
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        {task?.workspace_name || "-"}
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        {task?.due_date}
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        <StatusLabel status={task?.status || "Pending"} />
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-lg">
              <EllipsisVertical className="h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-md p-2">
            <DropdownMenuItem onClick={() => onView?.(task)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(task)}>
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(task)}>
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export function TaskTable({
  data = initialTasks,
  onView,
  onEdit,
  onDelete,
}: TaskTableProps) {
  return (
    <div className="mt-5 rounded-md border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table className="w-full">
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent text-[13px]">
            {columns.map((col) => (
              <TableHead
                key={col}
                className="p-5 font-semibold whitespace-nowrap"
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((task) => (
            <TaskRow
              key={task.task_id}
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
