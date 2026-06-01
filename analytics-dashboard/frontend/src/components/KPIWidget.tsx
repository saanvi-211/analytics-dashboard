interface KPIWidgetProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: string;
  color?: string;
}

export default function KPIWidget({ title, value, change, icon = "📊", color = "#6366f1" }: KPIWidgetProps) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: "1.25rem",
      border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ color: "#64748b", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>{title}</p>
          <p style={{ fontSize: "1.9rem", fontWeight: 700, margin: "0.25rem 0 0", color: "#0f172a" }}>{value}</p>
          {change !== undefined && (
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem", color: change >= 0 ? "#22c55e" : "#ef4444", fontWeight: 500 }}>
              {change >= 0 ? "▲" : "▼"} {Math.abs(change)}% vs last period
            </p>
          )}
        </div>
        <div style={{ fontSize: "1.6rem", background: `${color}18`, padding: "0.6rem", borderRadius: 10 }}>{icon}</div>
      </div>
    </div>
  );
}
