import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";

const statsData = [
  {
    title: "Total Active Tasks",
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

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
            {statsData?.map((stats, index) => {
              return (
                <SectionCards
                  key={index}
                  title={stats?.title || "Title"}
                  value={stats?.value || "N/A"}
                  trend={stats?.trend || "0"}
                  trendDirection={stats?.trendDirection}
                  footerText={stats?.footerText || "something went wrong"}
                />
              );
            })}
          </div>
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
