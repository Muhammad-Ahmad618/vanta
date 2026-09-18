import { taskStatus } from "@/types/dashboard";

export type Priority = "high" | "medium" | "low";
export type Status = taskStatus;

export interface Tasks {
  task_id: number;
  title: string;
  description: string;
  priority: Priority;
  status: taskStatus;
  due_date: string;
  assignee_name?: string | null;
  workspace_name?: string | null;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export interface TaskDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task;
  onUpdateTask?: (updatedTask: Task) => void;
}

export interface TaskTableProps {
  data?: Tasks[];
  onView?: (task: Task) => void;
  onEdit?: (id: Task) => void;
  onDelete?: (id: Task) => void;
}
