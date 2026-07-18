import { PersonalTasks } from "@/components/features/tasks";

function TasksPage() {
  return (
    <div className="flex flex-col gap-5 p-6">
      <PersonalTasks />
    </div>
  );
}

export default TasksPage;
