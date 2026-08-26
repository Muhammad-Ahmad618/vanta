import { ChartAreaInteractive } from "@/components/features/dashboard/taskCompletionChaart";
import { SectionCards } from "@/components/features/dashboard/statsCards";
import { RecentTaskTable } from "@/components/features/dashboard/recentTaskTable";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AtriskTaskItem } from "@/types/dashboard";
import { AtRiskTaskList } from "./atRiskTaskList";

const statsData = [
  {
    title: "Total Tasks",
    description: "",
    value: "5",
    trend: "0%",
    trendDirection: "down",
    footerText: "Tasks for the last 6 months",
  },
  {
    title: "Completed Tasks",
    description: "",
    value: "20",
    trend: "0",
    trendDirection: "up",
    footerText: "Tasks Completed this Week",
  },
  {
    title: "In-Progress Tasks",
    description: "",
    value: "14",
    trend: "+5%",
    trendDirection: "up",
    footerText: "Tasks that are not Completed",
  },
  {
    title: "Overdue Tasks",
    description: "",
    value: "3",
    trend: "-10%",
    trendDirection: "down",
    footerText: "Tasks that are past their due date",
  },
];

const atRiskTasks: AtriskTaskItem[] = [
  {
    title: "Cloud Infrastructure Audit",
    assignee: "James Smith",
    dueDate: "Jul 18, 2026",
    daysOverdue: 2,
    riskLevel: 92,
    priority: "Critical",
  },
  {
    title: "Security Compliance Review",
    assignee: "Sarah Chen",
    dueDate: "Jul 20, 2026",
    daysOverdue: 0,
    riskLevel: 74,
    priority: "High",
  },
  {
    title: "API Rate Limit Refactor",
    assignee: "Maya Johnson",
    dueDate: "Jul 22, 2026",
    daysOverdue: 0,
    riskLevel: 58,
    priority: "High",
  },
];

export function Dashboard() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2  ">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="p-4 lg:p-6 mx-6 rounded-xl border border-zinc-300 space-y-3 ">
          <div className="flex items-center gap-1.5 justify-start ">
            <Sparkles className="text-primary size-4" />
            <p className="font-semibold text-sm text-primary">
              Daily Focus Assistant
            </p>
          </div>
          <h2 className="font-semibold text-xl">
            You have 4 high-priority tasks requiring attention before 2 PM.
          </h2>
          <p className="text-zinc-500 text-xs lg:text-sm ">
            Based on your current velocity and deadline risks, Vanta recommends
            starting with the Cloud Infrastructure Audit. This will unlock three
            dependent tasks for the engineering team.
          </p>
          <Button className="rounded-sm text-sm p-5 " size={"lg"}>
            Start Focus Session
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
          {statsData?.map((stats, index) => (
            <SectionCards
              key={index}
              title={stats?.title || "Title"}
              value={stats?.value || "N/A"}
              trend={stats?.trend || "0"}
              trendDirection={stats?.trendDirection}
              footerText={stats?.footerText || "something went wrong"}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 px-4 lg:px-6">
          <div className="col-span-2">
            <ChartAreaInteractive />
          </div>
          {/* At-Risk Tasks Panel */}
          <AtRiskTaskList atRiskTasks={atRiskTasks} />
        </div>
        <div className="px-4 lg:px-6">
          <RecentTaskTable />
        </div>
      </div>
    </div>
  );
}
