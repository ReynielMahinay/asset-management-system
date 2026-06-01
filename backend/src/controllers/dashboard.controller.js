const { configDotenv } = require("dotenv");
const dbDashboard = require("../../db/queires/dashboard");
async function dashboardGet(req, res) {
  try {
    const stats = await dbDashboard.getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats");
    res.stats(500).json({ error: "Database error" });
  }
}

module.exports = {
  dashboardGet,
};
