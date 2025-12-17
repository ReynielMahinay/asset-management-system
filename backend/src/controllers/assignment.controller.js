const dbAssignment = require("../../db/queires/assigmentQueries");

async function assignedAsset(req, res) {
  try {
    const { asset_ids, user_id, assigned_date, notes } = req.body;

    const assignedAssetToUser = await dbAssignment.assignAssets(
      asset_ids,
      user_id,
      assigned_date,
      notes
    );
    console.log("Asset was  assigned:", assignedAssetToUser);
    res.json(assignedAssetToUser);
  } catch (error) {
    console.error("Error assigning the asset:", error);
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { assignedAsset };
