"use client";

import { cn, getChartColorByEngagementRate } from "../../../../../lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface ChartData {
  id: number;
  title: string;
  value: number;
  fill: string;
  engagementRate?: number;
  chart: Chart[];
}

interface Chart {
  label: string;
  count: number;
}

type CardTypes = {
  chartClassName?: string;
  className?: string;
  data: ChartData;
};

export default function Card({
  data,
  className,
}: React.PropsWithChildren<CardTypes>) {
  const { id, chart, engagementRate, title, value } = data;
  return (
    <div
      className={cn(
        "flex flex-col gap-2  bg-gradient-to-br from-white via-white to-white/40 rounded-xl p-4",
        className
      )}
    >
      <div className="flex flex-col">
        <h3 className="font-medium text-sm text-[#1E1C28]/40">{title}</h3>
        <h1 className="font-semibold text-2xl text-[#1E1C28]">{value}</h1>
      </div>
      <div className="ms-auto w-full h-14">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chart}>
            <Area
              type="bump"
              dataKey="count"
              stroke={getChartColorByEngagementRate(engagementRate!)}
              strokeWidth={1.8}
              fillOpacity={1}
              fill={`url(#deviceSessionsMobile-${id})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
