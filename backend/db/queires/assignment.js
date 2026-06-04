const { use } = require("react");
const { supabaseAdmin } = require("../supabaseAdmin");

/** 
 * @param {number[]} asset_ids
 * @param {number} user_id
 * @param {string}assigned_date -  date string (YYYY-MM-DD)
 * @param {String} notes optional
 * @return {Object[]}

*/

async function assignAssets(asset_ids, user_id, assigned_date, notes) {
  const { data, error } = await supabaseAdmin.rpc("assign_assets_with_status", {
    p_asset_ids: asset_ids,
    p_user_id: user_id,
    p_assigned_date: assigned_date,
    p_notes: notes,
  });

  if (error) {
    console.error("assignedAsset error", error.message);
    return null;
  }

  return data;
}

module.exports = { assignAssets };
