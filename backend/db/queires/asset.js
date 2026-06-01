const { supabaseAdmin } = require("../supabaseAdmin");

const ALLOWED_SORT = [
  "asset_id",
  "asset_name",
  "asset_type",
  "asset_brand",
  "asset_status",
  "created_at",
  "updated_at",
];

const ALLOWED_STATUS = ["assigned", "unassigned"];

function mapAsset(asset) {
  return {
    id: asset.asset_id,
    name: asset.asset_name,
    type: asset.asset_type,
    brand: asset.asset_brand,
    tag: asset.asset_tag,
    status: asset.asset_status,
    assignedTo: asset.assigned_to,
    assignedToName: asset.assigned_to_name || "N/A",
    timeCreated: formatDate(asset.created_at),
    timeUpdated: formatDate(asset.updated_at),
  };
}

async function insertAsset(name, type, brand, tag, status, assigned_to = null) {
  const { data, error } = await supabaseAdmin
    .from("assets")
    .insert({
      asset_name: name,
      asset_type: type,
      asset_brand: brand,
      asset_tag: tag,
      asset_status: status,
      assigned_to: assigned_to,
    })
    .select()
    .single();

  if (error) {
    console.error("insertAsset error", error.message);
    return null;
  }

  return data;
}

async function getAsset({
  page = 1,
  pageSize = 5,
  sort = "asset_id",
  order = "ASC",
  assign_status = null,
}) {
  const safeSort = ALLOWED_SORT.includes(sort) ? sort : "asset_id";
  const safeOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";
  const safeStatus = ALLLOWED_STATUS.includes(assign_status)
    ? assign_status
    : null;
  const offset = (page - 1) * pageSize;

  const { data, error } = await supabaseAdmin.rpc("get_assets", {
    p_assign_status: safeStatus,
    p_page_size: pageSize,
    p_offset: offset,
    p_sort: safeSort,
    p_order: safeOrder,
  });

  if (error) throw new Error(error.message);

  return {
    total: data.total,
    page,
    pageSize,
    data: (data.rows || []).map(mapAsset),
  };
}
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
  insertAsset,
  getAsset,
  getDashboardStats,
};
