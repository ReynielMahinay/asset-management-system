const express = require("express");
const cors = require("cors");
const app = express();
const assetRoutes = require("./routes/assetRoutes");
const userRoutes = require("./routes/userRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/assets", assetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assignment", assignmentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
