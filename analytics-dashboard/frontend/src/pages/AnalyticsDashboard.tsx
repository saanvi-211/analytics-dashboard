import { useState, lazy, Suspense } from "react";
import { useApi } from "../hooks/useApi";
import KPIWidget from "../components/KPIWidget";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899", "#14b8a6"];

// Mock KPI data (replace with /api/kpis in production)
const MOCK_KPIS = [
  { title: "Total Users", value: "12,847", change: 8.2, icon: "👤", color: "#6366f1" },
  { title: "Sessions Today", value: "3,291", change: 4.1, icon: "📱", color: "#22c55e" },
  { title: "Avg Session", value: "4m 32s", change: -1.3, icon: "⏱", color: "#f59e0b" },
  { title: "Page Views", value: "89,012", change: 12.7, icon: "👁", color: "#ec4899" },
  { title: "Bounce Rate", value: "38.4%", change: -2.1, icon: "↩️", color: "#14b8a6" },
  { title: "Conversions", value: "1,204", change: 18.5, icon: "🎯", color: "#8b5cf6" },
  { title: "Revenue", value: "$48,291", change: 6.3, icon: "💰", color: "#f97316" },
  { title: "Avg Order Value", value: "$40.10", change: -0.8, icon: "🛒", color: "#0ea5e9" },
  { title: "NPS Score", value: "72", change: 3.0, icon: "⭐", color: "#eab308" },
  { title: "Error Rate", value: "0.12%", change: -15.4, icon: "🐛", color: "#ef4444" },
];

const MOCK_TIMESERIES = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString("en", { month: "short", day: "numeric" }),
  value: Math.floor(Math.random() * 300 + 100),
}));

const MOCK_SOURCES = [
  { source: "Organic", sessions: 4200 },
  { source: "Direct", sessions: 2800 },
  { source: "Referral", sessions: 1900 },
  { source: "Social", sessions: 1400 },
  { source: "Email", sessions: 900 },
];

export default function AnalyticsDashboard({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<"overview" | "kpis">("overview");

  return (
    <div style={{ padding: "1.5rem", fontFamily: "system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Analytics Dashboard</h1>
          <p style={{ margin: "0.25rem 0 0", color: "#64748b", fontSize: "0.85rem" }}>Last 30 days · {user?.role}</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["overview", "kpis"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: "0.5rem 1rem", borderRadius: 8, border: "none", cursor: "pointer",
                background: activeTab === tab ? "#6366f1" : "#e2e8f0",
                color: activeTab === tab ? "#fff" : "#374151", fontWeight: 600, textTransform: "capitalize" }}>
              {tab === "kpis" ? "KPIs" : "Overview"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          {/* KPI Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {MOCK_KPIS.map((kpi) => <KPIWidget key={kpi.title} {...kpi} />)}
          </div>

          {/* Charts Row */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: "1.25rem", border: "1px solid #e2e8f0" }}>
              <h3 style={{ margin: "0 0 1rem", fontSize: "0.9rem", color: "#374151" }}>Daily Events – Last 30 Days</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={MOCK_TIMESERIES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "1.25rem", border: "1px solid #e2e8f0" }}>
              <h3 style={{ margin: "0 0 1rem", fontSize: "0.9rem", color: "#374151" }}>Traffic by Source</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={MOCK_SOURCES} dataKey="sessions" nameKey="source" cx="50%" cy="50%" outerRadius={80} label>
                    {MOCK_SOURCES.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div style={{ background: "#fff", borderRadius: 12, padding: "1.25rem", border: "1px solid #e2e8f0", marginTop: "1rem" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "0.9rem", color: "#374151" }}>Sessions by Source</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={MOCK_SOURCES}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="source" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="sessions" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {activeTab === "kpis" && (
        <div style={{ background: "#fff", borderRadius: 12, padding: "1.25rem", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 1rem" }}>KPI Management (CRUD)</h3>
          <p style={{ color: "#64748b", fontSize: "0.85rem" }}>
            Use <code>POST /api/kpis</code>, <code>PUT /api/kpis/:id</code>, <code>DELETE /api/kpis/:id</code> to manage custom metrics.
            All endpoints require JWT Bearer token.
          </p>
          <div style={{ marginTop: "1rem" }}>
            {MOCK_KPIS.slice(0, 5).map((kpi, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontWeight: 500 }}>{kpi.title}</span>
                <span style={{ color: "#6366f1", fontWeight: 700 }}>{kpi.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
