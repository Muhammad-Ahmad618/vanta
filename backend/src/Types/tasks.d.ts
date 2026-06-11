export interface task {
  task_id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  due_date: Date;
  status: "pending" | "Inprogress" | "completed";
}

export interface taskbreakDownProps {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

export interface taskRiskReport {
  high_risk: task[];
  medium_risk: task[];
  ontrack: task[];
  assessment: string;
}
