const pool = require("../pool");
const formatDate = require("../../src/utils/dateFormatter");
const { param } = require("../../src/app");

async function getAsset({
  page = 1,
  pageSize = 5,
  sort = "asset_id",
  order = "ASC",
} = {}) {
  const offset = (page - 1) * pageSize;

  const allowedSort = [
    "asset_id",
    "asset_name",
    "asset_type",
    "asset_brand",
    "asset_status",
    "created_at",
    "updated_at",
  ];
  if (!allowedSort.includes(sort)) sort = "asset_id";
  order = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

  // Query assets with LEFT JOIN to get assigned user's fullname
  const { rows } = await pool.query(
    `SELECT a.*, u.user_fullname AS assigned_to_name
     FROM assets a
     LEFT JOIN users u ON a.assigned_to = u.user_id
     ORDER BY ${sort} ${order}
     LIMIT $1 OFFSET $2`,
    [pageSize, offset]
  );

  // Count total assets
  const { rows: countRows } = await pool.query(
    `SELECT COUNT(*) AS total FROM assets`
  );
  const total = parseInt(countRows[0].total, 10);

  // Count recently added rows
  const { rows: recentlyCountRows } = await pool.query(
    "SELECT COUNT(*)::int AS recently_added_count FROM assets WHERE created_at >= NOW() - INTERVAL '30 days'"
  );
  const recentlyAddedCount = parseInt(
    recentlyCountRows[0].recently_added_count,
    10
  );

  // Count by status
  const { rows: statusCount } = await pool.query(
    `SELECT 
       COUNT(*) FILTER (WHERE asset_status = 'assigned') AS assigned_count, 
       COUNT(*) FILTER (WHERE asset_status <> 'assigned') AS not_assigned_count 
     FROM assets`
  );
  const { assigned_count, not_assigned_count } = statusCount[0];

  // Map assets for frontend
  const data = rows.map((asset) => ({
    id: asset.asset_id,
    name: asset.asset_name,
    type: asset.asset_type,
    brand: asset.asset_brand,
    tag: asset.asset_tag,
    status: asset.asset_status,
    assignedTo: asset.assigned_to, // user ID
    assignedToName: asset.assigned_to_name || "N/A", // user full name
    timeCreated: formatDate(asset.created_at),
    timeUpdated: formatDate(asset.updated_at),
  }));

  return {
    total,
    page,
    pageSize,
    data,
    recentlyAddedCount,
    assignedCount: Number(assigned_count),
    notAssignedCount: Number(not_assigned_count),
  };
}

async function searchAsset(keyword, filterUnassigned = false) {
  let query = `SELECT * FROM assets WHERE asset_name ILIKE  '%' || $1 || '%' 
    OR asset_tag ILIKE '%' || $1 || '%'`;

  const params = [keyword];

  if (filterUnassigned) {
    query += `AND asset_status = 'unassigned'`;
  }

  query += `LIMIT 50`;

  const result = await pool.query(query, params);

  return result.rows.map((asset) => ({
    id: asset.asset_id,
    asset_name: asset.asset_name,
    asset_type: asset.asset_type,
    asset_brand: asset.asset_brand,
    asset_tag: asset.asset_tag,
    asset_status: asset.asset_status,
    assigned_to: asset.assigned_to,
    created_at: asset.created_at,
    updated_at: asset.updated_at,
  }));
}

async function getUnassignedAssets({
  page = 1,
  pageSize = 5,
  sort = "asset_id",
  order = "ASC",
  keyword = "",
} = {}) {
  page = Number(page) || 1;
  pageSize = Number(pageSize) || 5;
  const offset = (page - 1) * pageSize;

  const allowedSort = [
    "asset_id",
    "asset_name",
    "asset_type",
    "asset_brand",
    "asset_status",
    "created_at",
    "updated_at",
  ];

  if (!allowedSort.includes(sort)) sort = "asset_id";
  order = order?.toUpperCase() === "DESC" ? "DESC" : "ASC";

  const params = [];
  const whereClause = ["asset_status = 'unassigned'"];

  if (keyword) {
    params.push(`%${keyword}%`);
    whereClause.push(`(
      asset_name ILIKE $${params.length} OR asset_tag ILIKE $${params.length})`);
  }

  const whereSQL = `WHERE ` + whereClause.join(`AND`);

  const countParams = keyword ? [params[0]] : [];
  const { rows: countRows } = await pool.query(
    `SELECT COUNT(*) AS total FROM assets ${whereSQL}`,
    countParams
  );

  const total = Number(countRows?.[0]?.total ?? 0);

  params.push(pageSize, offset);

  const { rows } = await pool.query(
    `
    SELECT * FROM assets
    ${whereSQL}
    ORDER BY ${sort} ${order}
    LIMIT $${params.length - 1} OFFSET $${params.length}
    `,
    params
  );

  const data = rows.map((asset) => ({
    id: asset.asset_id,
    name: asset.asset_name,
    type: asset.asset_type,
    brand: asset.asset_brand,
    tag: asset.asset_tag,
    status: asset.asset_status,
    timeCreated: asset.created_at ? formatDate(asset.created_at) : null,
    timeUpdated: asset.updated_at ? formatDate(asset.updated_at) : null,
  }));

  return { total, data };
}

async function insertAsset(name, type, brand, tag, status, assigned_to = null) {
  const result = await pool.query(
    `INSERT INTO assets 
       (asset_name, asset_type, asset_brand, asset_tag, asset_status, assigned_to)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
    [name, type, brand, tag, status, assigned_to]
  );
  return result.rows[0];
}

async function deleteAsset(id) {
  const result = await pool.query(
    "DELETE FROM assets WHERE asset_id = $1 RETURNING *",
    [id]
  );
  return result.rowCount > 0;
}

async function updateAsset(
  id,
  name,
  type,
  brand,
  tag,
  status,
  assigned_to = null
) {
  const result = await pool.query(
    `UPDATE assets 
     SET asset_name=$1,
         asset_type=$2,
         asset_brand=$3,
         asset_tag=$4,
         asset_status=$5,
         assigned_to=$6,
         updated_at=NOW()
     WHERE asset_id=$7
     RETURNING *`,
    [name, type, brand, tag, status, assigned_to, id]
  );

  return result.rows[0]; // undefined if asset not found
}

module.exports = {
  insertAsset,
  getAsset,
  getUnassignedAssets,
  deleteAsset,
  updateAsset,
  searchAsset,
};
