import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart as AreaReChart,
  Area,
} from "recharts";
import { useMedia } from "../../hooks/use-media";
import { CustomTooltip } from "./custom-tooltip";

const AreaChart = ({ data, children }: { data: any; children: any }) => {
  const isTablet = useMedia("(max-width: 800px)", false);
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      {...(isTablet && { minWidth: "700px" })}
    >
      <AreaReChart
        data={data}
        margin={{
          left: -16,
          right: 16,
        }}
        className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
      >
        {children && children}
      </AreaReChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
