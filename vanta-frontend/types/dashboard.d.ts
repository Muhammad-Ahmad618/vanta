export interface AtriskTaskItem {
  title: string;
  assignee: string;
  dueDate: string;
  daysOverdue: number;
  riskLevel: number;
  priority: "Critical" | "High" | "Medium" | "Low";
}

export interface AtriskTaskListProps {
  atRiskTasks: AtriskTaskItem[];
}
