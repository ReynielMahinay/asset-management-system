const { parse } = require("dotenv");
const dbAsset = require("../../db/queires/asset");
const { supabaseAdmin } = require("../../db/supabaseAdmin");

async function assetCreatePost(req, res) {
  try {
    const { name, type, brand, tag, status, assigned_to = null } = req.body;
    console.log("Received data:", req.body);

    const newAsset = await dbAsset.insertAsset(
      name,
      type,
      brand,
      tag,
      status,
      assigned_to,
    );
    console.log("Inserted asset:", newAsset);
    res.json(newAsset);
  } catch (error) {
    console.error("Error inserting asset: ", error);
    res.status(500).json({ error: "Database error" });
  }
}

async function assetGet(req, res) {
  try {
    const {
      page = 1,
      pageSize = 5,
      sort = "asset_id",
      order = "asc",
      keyword = "",
      assign_status = null,
    } = req.query;

    let assets;

    if (keyword) {
      const { data: rows } = await dbAsset.searchAsset(keyword);

      const start = (page - 1) * pageSize;
      const paginationRows = rows.slice(start, start + parseInt(pageSize));

      assets = {
        total: rows.length,
        page: Number(page),
        pageSize: Number(pageSize),
        data: paginationRows,
      };
    } else {
      assets = await dbAsset.getAsset({
        page: Number(page),
        pageSize: Number(pageSize),
        sort,
        order: order.toUpperCase(),
        assign_status: assign_status,
      });
    }
    res.json(assets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

async function unassignedAssetGet(req, res) {
  try {
    const {
      page = 1,
      pageSize = 5,
      sort = "asset_id",
      order = "ASC",
      keyword = "",
    } = req.query;
    console.log("🔍 unassignedAssetGet called with:", {
      page,
      pageSize,
      keyword,
    });

    let assets;

    if (keyword) {
      console.log("🔍 Searching with keyword:", keyword);
      const { data: rows } = await dbAsset.searchAsset(keyword);

      console.log("📋 Search results (raw):", rows); // ← Add this
      console.log(
        "🔎 Checking asset_status values:",
        rows?.map((r) => ({
          name: r.name,
          status: r.asset_status, // ← Check if this exists
        })),
      );

      const unassignedRows = rows.filter(
        (asset) => asset.status === "unassigned",
      );

      console.log("✅ Filtered unassigned rows:", unassignedRows); // ← Add this

      const start = (page - 1) * pageSize;
      const paginationRows = unassignedRows.slice(
        start,
        start + parseInt(pageSize),
      );

      assets = {
        total: unassignedRows.length,
        page: Number(page),
        pageSize: Number(pageSize),
        data: paginationRows,
      };
      console.log("📤 Returning:", assets); // ← Add this
    } else {
      console.log(
        "🔓 No keyword, calling getAsset with assign_status='unassigned'",
      );

      assets = await dbAsset.getAsset({
        page: Number(page),
        pageSize: Number(pageSize),
        sort,
        order: order.toUpperCase(),
        assign_status: "unassigned",
      });
      console.log("✅ getAsset returned:", assets);
    }

    res.json(assets);
  } catch (error) {
    console.error("Error in getUnassignedAssets:", error);
    res.status(500).json({ error: error.message });
  }
}

async function assetDelete(req, res) {
  try {
    const { id } = req.params;

    console.log("Deleting asset with ID", id);

    const deleted = await dbAsset.deleteAsset(id);

    if (deleted) {
      res.json({ message: "Asset deleted successfuly" });
    } else {
      res.status(404).json({ error: "Asset not found" });
    }
  } catch (error) {
    console.error("Error deleting asset: ", error);
    res.status(500).json({ error: "Database error" });
  }
}

async function assetUpdate(req, res) {
  try {
    const { id } = req.params;
    const { name, type, brand, tag, status, assigned_to = null } = req.body;

    console.log("Updating asset", id, req.body);

    const updated = await dbAsset.updateAsset(
      id,
      name,
      type,
      brand,
      tag,
      status,
      assigned_to,
    );

    if (!updated) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating asset:", error);
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = {
  assetCreatePost,
  assetGet,
  assetDelete,
  assetUpdate,
  unassignedAssetGet,
};
