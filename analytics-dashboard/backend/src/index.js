require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const analyticsRoutes = require("./routes/analytics");
const kpiRoutes = require("./routes/kpis");
const { authenticateToken } = require("./middleware/auth");

const app = express();
app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/analytics", authenticateToken, analyticsRoutes);
app.use("/api/kpis", authenticateToken, kpiRoutes);

app.get("/health", (_, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
