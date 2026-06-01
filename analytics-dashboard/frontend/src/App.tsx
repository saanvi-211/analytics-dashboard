import { useState, useEffect } from "react";
import api from "./hooks/useApi";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("analyst@company.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9" }}>
      <div style={{ background: "#fff", padding: "2.5rem", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", width: 360 }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>📊 Analytics Dashboard</h1>
        <form onSubmit={login}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4, fontWeight: 500, fontSize: "0.9rem" }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
              style={{ width: "100%", padding: "0.65rem", border: "1px solid #e2e8f0", borderRadius: 8, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: 4, fontWeight: 500, fontSize: "0.9rem" }}>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required
              style={{ width: "100%", padding: "0.65rem", border: "1px solid #e2e8f0", borderRadius: 8, boxSizing: "border-box" }} />
          </div>
          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "0.75rem", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <nav style={{ background: "#1e293b", color: "#fff", padding: "0.75rem 1.5rem", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700 }}>📊 Analytics Platform</span>
        <button onClick={() => { localStorage.removeItem("token"); setUser(null); }}
          style={{ background: "transparent", color: "#94a3b8", border: "1px solid #334155", borderRadius: 6, padding: "0.3rem 0.8rem", cursor: "pointer" }}>
          Logout
        </button>
      </nav>
      <AnalyticsDashboard user={user} />
    </div>
  );
}
