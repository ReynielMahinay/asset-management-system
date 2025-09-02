const pool = require('./pool')
const formatDate = require('../src/utils/dateFormatter')


async function getAsset() {
  console.time("db_query");
  let query = "SELECT * FROM assets ORDER by asset_id ASC";
  const { rows } = await pool.query(query);
  console.timeEnd("db_query");

  console.time("map_format");
  const mapped = rows.map(asset => ({
    id: asset.asset_id,
    name: asset.asset_name,
    type: asset.asset_type,
    brand: asset.asset_brand,
    status: asset.asset_status,
    assignedTo: asset.assigned_to,
    timeCreated: asset.created_at,   // skip formatDate first
    timeUpdated: asset.updated_at,
  }));
  console.timeEnd("map_format");

  return mapped;
}


async function insertAsset(name, type, brand){
   const result =  await pool.query("INSERT INTO assets (asset_name, asset_type, asset_brand) VALUES ($1, $2, $3) RETURNING *", 
        [name, type, brand]);
    return result.rows[0];
}

module.exports = {insertAsset, getAsset}