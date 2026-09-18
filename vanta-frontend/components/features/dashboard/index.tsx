"use client";

import { ChartAreaInteractive } from "@/components/features/dashboard/taskCompletionChaart";
import { StatCard } from "@/components/features/dashboard/statsCards";
import { RecentTaskTable } from "@/components/features/dashboard/recentTaskTable";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AtRiskTaskList } from "./atRiskTaskList";
import { TaskDetailModal } from "@/components/custom/taskDetailModal";
import { useState } from "react";
import {
  useGetDashboardStats,
  useGetAtRiskTasks,
  useGetTaskTrends,
  useGetRecentTasks,
} from "@/hooks/user/dashboard";
import { recentTasks } from "@/types/dashboard";

export function Dashboard() {
  const [selectedTask, setSelectedTask] = useState<recentTasks | null>(null);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<"6w" | "6m">("6w");
  const trendMode = timeRange === "6m" ? "monthly" : "weekly";

  const {
    data: dashboardStats,
    isLoading,
    isError,
    error,
  } = useGetDashboardStats();

  const {
    data: atriskTasks,
    isLoading: isAtRiskLoading,
    isError: isAtRiskError,
    error: atRiskError,
  } = useGetAtRiskTasks();

  const {
    data: taskTrends,
    isLoading: isTaskTrendsLoading,
    isError: isTaskTrendsError,
    error: taskTrendsError,
  } = useGetTaskTrends(trendMode);

  const {
    data: recentTasks,
    isLoading: isRecentTasksLoading,
    isError: isRecentTasksError,
    error: recentTasksError,
  } = useGetRecentTasks();

  return (
    <>
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
              Based on your current velocity and deadline risks, Vanta
              recommends starting with the Cloud Infrastructure Audit. This will
              unlock three dependent tasks for the engineering team.
            </p>
            <Button className="rounded-sm text-sm p-5 " size={"lg"}>
              Start Focus Session
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5 dark:*:data-[slot=card]:bg-card">
            <StatCard
              title="Total Tasks"
              value={dashboardStats?.data?.total || 0}
            />
            <StatCard
              title="Completed"
              value={dashboardStats?.data?.completed || 0}
            />
            <StatCard
              title="In Progress"
              value={dashboardStats?.data?.in_progress || 0}
            />
            <StatCard
              title="Pending"
              value={dashboardStats?.data?.pending || 0}
            />
            <StatCard
              title="Overdue"
              value={dashboardStats?.data?.overdue || 0}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 px-4 lg:px-6">
            <div className="col-span-2">
              <ChartAreaInteractive
                chartData={taskTrends || []}
                timeRange={timeRange}
                onTimeRangeChange={(v) => setTimeRange(v as "6w" | "6m")}
              />
            </div>
            {/* At-Risk Tasks Panel */}
            <AtRiskTaskList atRiskTasks={atriskTasks || []} />
          </div>
          <div className="px-4 lg:px-6">
            <RecentTaskTable
              tasks={recentTasks || []}
              onView={(task) => {
                setSelectedTask(task);
                setOpenDetail(true);
              }}
            />
          </div>
        </div>
      </div>
      <TaskDetailModal
        key={selectedTask?.task_id}
        task={selectedTask || undefined}
        open={openDetail}
        onOpenChange={setOpenDetail}
      />
    </>
  );
}
