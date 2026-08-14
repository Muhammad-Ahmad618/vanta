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
import { Task, TaskTableProps } from "@/types/task";
import { StatusLabel } from "@/components/custom/status-label";

export const initialTasks: Task[] = [
  {
    id: "T-1",
    title: "Payment Gateway Integration",
    description: "Integrate Stripe payment gateway",
    priority: "High",
    due_date: "2026-06-29",
    assignee: "James Smith",
    status: "Pending",
    workspace: "Workspace 1",
  },
  {
    id: "T-2",
    title: "User Authentication Bugfix",
    description: "Fix user authentication bug",
    priority: "Medium",
    due_date: "2026-06-30",
    assignee: "Eddie Lake",
    status: "In Process",
    workspace: "Workspace 2",
  },
  {
    id: "T-3",
    title: "Executive Summary Narrative",
    description: "Write executive summary",
    priority: "High",
    due_date: "2026-07-02",
    assignee: "Eddie Lake",
    status: "Done",
  },
  {
    id: "T-4",
    title: "Design System Implementation",
    description: "Implement design system",
    priority: "Low",
    due_date: "2026-07-15",
    status: "In Process",
    workspace: "Workspace 2",
  },
  {
    id: "T-5",
    title: "Compliance Documentation",
    description: "Write compliance documentation",
    priority: "Medium",
    due_date: "2026-08-20",
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
  onView?: (task: Task) => void;
  onEdit?: (id: Task) => void;
  onDelete?: (id: Task) => void;
}

function TaskRow({ task, onView, onEdit, onDelete }: TaskRowProps) {
  return (
    <TableRow
      className="hover:bg-muted/20 text-[13px] overflow-hidden
    "
    >
      <TableCell className="py-3 px-5 whitespace-nowrap">{task?.id}</TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        {task.title}
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        {task.description || "-"}
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
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
      <TableCell className="py-3 px-5 whitespace-nowrap">
        {task?.assignee || "-"}
      </TableCell>
      <TableCell className="py-3 px-5 whitespace-nowrap">
        {task?.workspace || "-"}
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
