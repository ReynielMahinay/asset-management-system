const pool = require("../pool");

/**
 * Assign multiple assets to a user at once
 * @param {number[]} asset_ids - array of asset IDs
 * @param {number} user_id - user ID
 * @param {string} assigned_date - date string, e.g., "2025-12-17"
 * @param {string} notes - optional notes
 * @returns inserted rows
 */
// Example in your assignment query
async function assignAssets(asset_ids, user_id, assigned_date, notes) {
  const values = [];
  const placeholders = [];

  asset_ids.forEach((id, index) => {
    const base = index * 4;
    placeholders.push(
      `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`
    );
    values.push(id, user_id, assigned_date, notes);
  });

  const query = `
    INSERT INTO asset_assignments (asset_id, user_id, assigned_date, notes)
    VALUES ${placeholders.join(", ")}
    RETURNING *;
  `;

  const result = await pool.query(query, values);

  // Update assets table
  const updateQuery = `
    UPDATE assets
    SET assigned_to = $1, asset_status = 'assigned'
    WHERE asset_id = ANY($2::int[]);
  `;
  await pool.query(updateQuery, [user_id, asset_ids]);

  return result.rows;
}

module.exports = {
  assignAssets,
};
