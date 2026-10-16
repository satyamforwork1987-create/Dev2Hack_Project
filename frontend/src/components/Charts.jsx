import { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar, Legend,
} from "recharts";

/**
 * Charts — Visualizations for NOVA AI
 * Solid cream & white theme styling with crisp typography
 */

const PIE_COLORS = ["#0F2A4A", "#0D9488", "#D97706", "#2563EB", "#7C3AED", "#DB2777", "#059669", "#EA580C"];
const RISK_COLORS = { Normal: "#15803D", Medium: "#B45309", High: "#B91C1C" };

// Clean Light Tooltip styling
const tooltipStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E2D6",
  borderRadius: "8px",
  fontSize: "12px",
  color: "#1C1917",
  boxShadow: "0 4px 12px rgba(28, 25, 23, 0.08)",
  padding: "8px 12px",
};

const Charts = ({ transactions }) => {
  // --- 1. Transaction Trend Data ---
  const spendingTrend = useMemo(() => {
    const dailyMap = {};
    for (const tx of transactions) {
      const day = new Date(tx.date).toISOString().split("T")[0];
      dailyMap[day] = (dailyMap[day] || 0) + Math.abs(tx.amount);
    }
    return Object.entries(dailyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, amount]) => ({
        date: new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
        amount: Math.round(amount),
      }));
  }, [transactions]);

  // --- 2. Category Distribution Data ---
  const categoryData = useMemo(() => {
    const catMap = {};
    for (const tx of transactions) {
      const cat = tx.category || "Uncategorized";
      catMap[cat] = (catMap[cat] || 0) + Math.abs(tx.amount);
    }
    return Object.entries(catMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value: Math.round(value) }));
  }, [transactions]);

  // --- 3. Risk Distribution Data ---
  const riskData = useMemo(() => {
    const counts = { Normal: 0, Medium: 0, High: 0 };
    for (const tx of transactions) {
      counts[tx.riskLevel] = (counts[tx.riskLevel] || 0) + 1;
    }
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      fill: RISK_COLORS[name],
    }));
  }, [transactions]);

  if (transactions.length === 0) return null;

  const formatINR = (v) => "₹" + v.toLocaleString("en-IN");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        marginBottom: "28px",
      }}
      className="animate-fade-in"
    >
      {/* 1. Spending Trend */}
      <div
        className="nova-card"
        style={{
          padding: "22px",
          gridColumn: "1 / -1",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Transaction Volume Trend
            </h3>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              Daily gross transaction activity across statements
            </p>
          </div>
          <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600, background: "var(--surface-cream)", padding: "4px 10px", borderRadius: "6px" }}>
            Daily Timeline
          </span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={spendingTrend}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E2D6" />
            <XAxis dataKey="date" tick={{ fill: "#78716C", fontSize: 11 }} axisLine={{ stroke: "#E8E2D6" }} />
            <YAxis tick={{ fill: "#78716C", fontSize: 11 }} tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} axisLine={{ stroke: "#E8E2D6" }} />
            <Tooltip contentStyle={tooltipStyle} formatter={(val) => [formatINR(val), "Volume"]} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#0F2A4A"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#0F2A4A", strokeWidth: 1, stroke: "#FFFFFF" }}
              activeDot={{ r: 6, fill: "#0F2A4A", strokeWidth: 2, stroke: "#FFFFFF" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Category Breakdown */}
      <div className="nova-card" style={{ padding: "22px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
          Spending by Category
        </h3>
        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
          AI-categorized merchant distribution
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={45}
              paddingAngle={3}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} formatter={(val) => [formatINR(val), "Spent"]} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "12px" }}>
          {categoryData.slice(0, 5).map((entry, i) => (
            <span key={entry.name} style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "var(--text-secondary)" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: PIE_COLORS[i % PIE_COLORS.length] }} />
              {entry.name}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Risk Distribution */}
      <div className="nova-card" style={{ padding: "22px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
          Risk Classification
        </h3>
        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
          Statistical anomaly detection distribution
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E2D6" />
            <XAxis dataKey="name" tick={{ fill: "#78716C", fontSize: 12 }} axisLine={{ stroke: "#E8E2D6" }} />
            <YAxis tick={{ fill: "#78716C", fontSize: 11 }} axisLine={{ stroke: "#E8E2D6" }} />
            <Tooltip contentStyle={tooltipStyle} formatter={(val) => [val, "Count"]} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {riskData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
