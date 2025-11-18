const pool = require('./pool')
const formatDate = require('../src/utils/dateFormatter')

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

  // Map
  const data = rows.map(asset => ({
    id: asset.asset_id,
    name: asset.asset_name,
    type: asset.asset_type,
    brand: asset.asset_brand,
    status: asset.asset_status,
    assignedTo: asset.assigned_to,
    timeCreated: asset.created_at,
    timeUpdated: asset.updated_at,
  }));

  return { total, page, pageSize, data };
}

async function insertAsset(name, type, brand){
   const result =  await pool.query("INSERT INTO assets (asset_name, asset_type, asset_brand) VALUES ($1, $2, $3) RETURNING *", 
        [name, type, brand]);
    return result.rows[0];
}

async function deleteAsset(id){
  const result = await pool.query('DELETE FROM assets WHERE asset_id = $1 RETURNING *', [id])
  return result.rowCount > 0;
}


module.exports = {insertAsset, getAsset, deleteAsset}