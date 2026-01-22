const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const assetRoutes = require("./routes/assetRoutes");
const userRoutes = require("./routes/userRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const accountRoutes = require("./routes/accountRoutes");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/assets", assetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/login", accountRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
