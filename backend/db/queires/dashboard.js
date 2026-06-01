const { supabaseAdmin } = require("../supabaseAdmin");

async function getDashboardStats() {
  const { data, error } = await supabaseAdmin.rpc("get_dashboard_stats");

  if (error) throw new Error(error.message);

  return {
    total: data.total,
    recentlyAddedCount: data.recently_added,
    assignedCount: data.assigned_count,
    notAssignedCount: data.not_assigned_count,
  };
}

module.exports = {
  getDashboardStats,
};
