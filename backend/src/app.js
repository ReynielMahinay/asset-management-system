const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(helmet());
const assetRoutes = require("./routes/assetRoutes");
const userRoutes = require("./routes/userRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const accountRoutes = require("./routes/accountRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const config = require("../config");

console.log("Config loaded:", config);
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/assets", assetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/login", accountRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
