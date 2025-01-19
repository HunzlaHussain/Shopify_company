"use client";
import AreaChart from "@/components/charts/area-chart";
import { CustomTooltip } from "@/components/charts/custom-tooltip";
import SimpleBar from "@/components/ui/simplebar";

import { XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";
import { Title } from "@/components/ui/text";

const data = [
  {
    month: "Jan",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "Feb",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "Mar",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "Apr",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "May",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "Jun",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "Jul",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "Aug",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "Sep",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "Oct",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "Nov",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
  {
    month: "Dec",
    users: Math.floor(Math.random() * (7000 - 500 + 1)) + 500,
  },
];

const ActiveUsers = () => {
  return (
    <div className="min-h-[432px] p-4 rounded-xl bg-gradient-to-br from-white via-white to-white/40">
      <Title>Active Users</Title>
      <SimpleBar>
        <div className="h-96 w-full pt-9">
          <AreaChart data={data}>
            <>
              <defs>
                <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#01C4FF" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#01C4FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className=" "
              />
              <YAxis tickLine={true} className=" " />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#01C4FF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#users)"
              />
            </>
          </AreaChart>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ActiveUsers;
