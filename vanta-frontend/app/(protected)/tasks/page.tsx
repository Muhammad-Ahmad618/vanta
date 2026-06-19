import { TaskHeader } from "@/components/features/tasks/header";
import { TaskTable } from "@/components/features/tasks/taskTable";

function TasksPage() {
  return (
    <div className="flex flex-col gap-5 p-6">
      <TaskHeader />
      <TaskTable />
    </div>
  );
}

export default TasksPage;
