import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TotalUsersChart = ({ data }: any) => {
  return (
    <div
      className="rounded-lg bg-white p-6 shadow"
      style={{ width: "100%", height: 330 }}
    >
      <h3 className="text-sm font-bold" style={{ marginBottom: 16 }}>
        Total Users
      </h3>
      <ResponsiveContainer width="100%" height={244}>
        <LineChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "#1C1C1C", opacity: 0.4 }} />
          <YAxis tick={{ fill: "#1C1C1C", opacity: 0.4 }} />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: 24 }}
            formatter={(value, entry) => (
              <span
                style={{
                  color: entry.color,
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                {value}
              </span>
            )}
          />
          <Line
            type="monotone"
            dataKey="thisYear"
            stroke="#1C1C1C"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="lastYear"
            stroke="#A8C5DA"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalUsersChart;
