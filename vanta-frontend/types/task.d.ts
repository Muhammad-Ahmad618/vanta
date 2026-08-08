export type Priority = "High" | "Medium" | "Low";
export type Status = "Pending" | "In Process" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  due_date: string;
  assignee?: string;
  status?: Status;
  workspace?: string;
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
  data?: Task[];
  onView?: (task: Task) => void;
  onEdit?: (id: Task) => void;
  onDelete?: (id: Task) => void;
}
