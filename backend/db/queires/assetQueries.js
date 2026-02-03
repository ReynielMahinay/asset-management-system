const pool = require("../pool");
const formatDate = require("../../src/utils/dateFormatter");
const { supabaseAdmin } = require("../supabaseAdmin");

async function getAsset({
  page = 1,
  pageSize = 5,
  sort = "id",
  order = "asc",
  assign_status = null,
} = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabaseAdmin.from("assets").select(
    `
      *,
      assigned_user:users!assigned_to (
        fullname
      )
      `,
    { count: "exact" },
  );

  // filter
  if (assign_status) {
    query = query.eq("status", assign_status);
  }

  // sort
  query = query.order(sort, {
    ascending: order.toLowerCase() !== "desc",
  });

  // pagination
  query = query.range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;

  // recently added
  const { count: recentlyAddedCount } = await supabaseAdmin
    .from("assets")
    .select("*", { count: "exact", head: true })
    .gte(
      "created_at",
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    );

  // better status counts
  const { count: assignedCount } = await supabaseAdmin
    .from("assets")
    .select("*", { count: "exact", head: true })
    .eq("status", "assigned");

  const { count: notAssignedCount } = await supabaseAdmin
    .from("assets")
    .select("*", { count: "exact", head: true })
    .neq("status", "assigned");

  const mapped = data.map((a) => ({
    id: a.id,
    name: a.name,
    type: a.type,
    brand: a.brand,
    tag: a.tag,
    status: a.status,
    assignedTo: a.assigned_to,
    assignedToName: a.assigned_user?.fullname || "N/A",
    timeCreated: formatDate(a.created_at),
    timeUpdated: formatDate(a.updated_at),
  }));

  return {
    total: count,
    page,
    pageSize,
    data: mapped,
    recentlyAddedCount,
    assignedCount,
    notAssignedCount,
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

  const params = []; // for dynamic query
  const whereClause = ["asset_status = 'unassigned'"]; // based query

  if (keyword) {
    // if keyword exist on the request of the user params[%${keyword}%]
    // whereClause["asset_status = 'unassigned'" "asset_name ILIKE $${params.length} OR asset_tag ILIKE $${params.length}"]
    params.push(`%${keyword}%`);
    whereClause.push(`(
      asset_name ILIKE $${params.length} OR asset_tag ILIKE $${params.length})`);
  }

  const whereSQL = `WHERE ` + whereClause.join(`AND`);

  const countParams = keyword ? [params[0]] : [];
  const { rows: countRows } = await pool.query(
    `SELECT COUNT(*) AS total FROM assets ${whereSQL}`,
    countParams,
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
    params,
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

async function insertAsset(
  name,
  type,
  brand,
  tag,
  status = "unassigned",
  assigned_to = null,
) {
  const { data, error } = await supabaseAdmin
    .from("assets")
    .insert([
      {
        name,
        category,
        brand,
        tag,
        status,
        assigned_to,
      },
    ])
    .select() // same as RETURNING *
    .single(); // return one object

  if (error) throw error;

  return data;
}

async function deleteAsset(id) {
  const result = await pool.query(
    "DELETE FROM assets WHERE asset_id = $1 RETURNING *",
    [id],
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
  assigned_to = null,
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
    [name, type, brand, tag, status, assigned_to, id],
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
