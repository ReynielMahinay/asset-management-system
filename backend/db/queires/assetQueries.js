const pool = require("../pool")
const formatDate = require("../../src/utils/dateFormatter")

async function getAsset({ page = 1, pageSize = 5, sort = "asset_id", order = "ASC" } = {}) {
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

  // Query assets
  const { rows } = await pool.query(
    `SELECT * FROM assets ORDER BY ${sort} ${order} LIMIT $1 OFFSET $2`,
    [pageSize, offset]
  );

  // Count total
  const { rows: countRows } = await pool.query("SELECT COUNT(*) AS total FROM assets");
  const total = parseInt(countRows[0].total, 10);

  //Count recently added rows
  const {rows: recentlyCountRows} = await pool.query("SELECT COUNT(*)::int AS recently_added_count FROM assets WHERE created_at >= NOW() - INTERVAL '30 days'");

  const recentlyAddedCount = parseInt(recentlyCountRows[0].recently_added_count, 10)

  const { rows: addedPerMonth } = await pool.query(`
    SELECT 
      DATE_TRUNC('month', created_at) AS month,
      COUNT(*) FILTER (WHERE asset_status = 'assigned') AS assignedPerMonth,
      COUNT(*) FILTER (WHERE asset_status <> 'assigned') AS unassignedPerMonth
    FROM assets
    GROUP BY 1
    ORDER BY 1;
  `);


  //Count by status
  const {rows: statusCount } = await pool.query(`SELECT COUNT(*) FILTER (WHERE asset_status = 'assigned') AS assigned_count, 
    COUNT(*) FILTER (WHERE asset_status <> 'assigned') AS not_assigned_count FROM assets`);

  const {assigned_count, not_assigned_count} = statusCount[0];

  // Map
  const data = rows.map(asset => ({
    id: asset.asset_id,
    name: asset.asset_name,
    type: asset.asset_type,
    brand: asset.asset_brand,
    tag: asset.asset_tag,
    status: asset.asset_status,
    assignedTo: asset.assigned_to,
    timeCreated: formatDate(asset.created_at),
    timeUpdated: formatDate(asset.updated_at),
  }));


  return { total, page, pageSize, data, recentlyAddedCount , assignedCount: Number(assigned_count), notAssignedCount: Number(not_assigned_count) };
}

async function searchAsset(keyword){
  const result = await pool.query(
    `SELECT * FROM assets WHERE asset_name ILIKE  '%' || $1 || '%' 
    OR asset_tag ILIKE '%' || $1 || '%' LIMIT 50`, [keyword]
  )

   return result.rows.map(asset => ({
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

async function insertAsset(name, type, brand, tag, status, assigned_to = null){
   const result =  await pool.query(
     `INSERT INTO assets 
       (asset_name, asset_type, asset_brand, asset_tag, asset_status, assigned_to)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`, 
     [name, type, brand, tag, status, assigned_to]
   );
   return result.rows[0];
}


async function deleteAsset(id){
  const result = await pool.query('DELETE FROM assets WHERE asset_id = $1 RETURNING *', [id])
  return result.rowCount > 0;
}

async function updateAsset(id, name, type, brand, tag, status, assigned_to = null) {
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

module.exports = {insertAsset, getAsset, deleteAsset, updateAsset, searchAsset}