"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendUpIcon, TrendDownIcon } from "@phosphor-icons/react";

export function SectionCards({
  title,
  value,
  trend,
  trendDirection,
  footerText,
}: {
  title: string;
  value: string;
  trend: string;
  trendDirection: string;
  footerText: string;
}) {
  return (
    <Card className="@container/card rounded-lg">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            {trendDirection === "up" ? <TrendUpIcon /> : <TrendDownIcon />}
            {trend}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending {trendDirection} this month{" "}
          {trendDirection === "up" ? (
            <TrendUpIcon className="size-4" />
          ) : (
            <TrendDownIcon className="size-4" />
          )}
        </div>
        <div className="text-muted-foreground">{footerText}</div>
      </CardFooter>
    </Card>
  );
}
