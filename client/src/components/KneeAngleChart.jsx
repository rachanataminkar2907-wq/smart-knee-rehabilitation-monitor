import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function KneeAngleChart({ data }) {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={290}>
        <LineChart data={data} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e8edf4" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#8290a5", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 130]}
            tick={{ fill: "#8290a5", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}°`}
          />
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(1)}°`, "Knee angle"]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e6eaf0",
            }}
          />
          <Line
            type="monotone"
            dataKey="angle"
            stroke="#3867f4"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}