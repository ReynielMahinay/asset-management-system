const { use } = require("react");
const { supabaseAdmin } = require("../supabaseAdmin");

/** 
 * @param {number[]} asset_ids
 * @param {number} user_id
 * @param {string}assigned_date -  date string (YYYY-MM-DD)
 * @param {strin} notes optional
 * @return {Object[]}

*/

async function assignAsset(asset_ids, user_id, assigned_date, notes) {
  const rows = asset_ids.map((asset_id) => ({
    asset_id,
    user_id,
    assigned_date,
    notes,
  }));

  const { data, error } = await supabaseAdmin
    .from("asset_assignments")
    .insert(rows).select;

  if (error) {
    console.error("assignedAsset error", error.message);
    return null;
  }

  return data;
}
