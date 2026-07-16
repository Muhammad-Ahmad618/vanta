export type Priority = "High" | "Medium" | "Low";
export type Status = "Pending" | "In Process" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  assignee?: string;
  status: Status;
  workspace?: string;
}
