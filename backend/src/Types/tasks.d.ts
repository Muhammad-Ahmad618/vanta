export interface task {
  task_id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  due_date: Date;
  status: "pending" | "Inprogress" | "completed";
}
