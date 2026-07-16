import { ChartAreaInteractive } from "@/components/features/dashboard/taskCompletionChaart";
import { SectionCards } from "@/components/features/dashboard/statsCards";
import { RecentTaskTable } from "@/components/features/dashboard/recentTaskTable";
import { Sparkles, AlertTriangle, User, CalendarDays, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

const atRiskTasks = [
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
    <div className="@container/main flex flex-1 flex-col gap-2 bg-secondary-foreground ">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="p-4 lg:p-6 mx-6 rounded-xl border border-zinc-300 space-y-3 bg-primary-light">
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
          <Button className="rounded-sm text-sm px-5 py-4" size={"lg"}>
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
          <div className="col-span-1 border border-border rounded-lg bg-card shadow-sm flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-border">
              <AlertTriangle className="size-4 text-destructive shrink-0" />
              <h3 className="font-semibold text-sm">At-Risk Tasks</h3>
              <Badge
                variant="destructive"
                className="rounded-full text-[10px] px-2 py-0.5 font-semibold tracking-wide uppercase"
              >
                Critical
              </Badge>
            </div>
            {/* Task List */}
            <div className="flex flex-col gap-0 flex-1 divide-y divide-border overflow-auto">
              {atRiskTasks.map((task, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 px-4 py-3 hover:bg-muted/30 transition-colors"
                >
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-snug line-clamp-2">
                      {task.title}
                    </p>
                    <Badge
                      variant={task.priority === "Critical" ? "destructive" : "secondary"}
                      className="rounded-md text-[10px] px-1.5 py-0.5 shrink-0"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  {/* Meta row */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="size-3" />
                      {task.assignee}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="size-3" />
                      {task.dueDate}
                    </span>
                  </div>
                  {/* Risk bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <TrendingUp className="size-3" />
                        Risk Score
                      </span>
                      <span
                        className={`text-[11px] font-semibold ${
                          task.riskLevel >= 80
                            ? "text-destructive"
                            : task.riskLevel >= 60
                              ? "text-amber-500"
                              : "text-emerald-500"
                        }`}
                      >
                        {task.riskLevel}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          task.riskLevel >= 80
                            ? "bg-destructive"
                            : task.riskLevel >= 60
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                        style={{ width: `${task.riskLevel}%` }}
                      />
                    </div>
                  </div>
                  {task.daysOverdue > 0 && (
                    <p className="text-[11px] font-medium text-destructive">
                      ⚠ {task.daysOverdue} day{task.daysOverdue > 1 ? "s" : ""} overdue
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-6">
          <RecentTaskTable />
        </div>
      </div>
    </div>
  );
}

