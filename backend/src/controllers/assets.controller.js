const dbAsset = require("../../db/queires/assetQueries");

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
      assigned_to
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
      unassigned = "false",
    } = req.query;

    let assets;

    if (keyword) {
      const rows = await dbAsset.searchAsset(keyword);

      const start = (page - 1) * pageSize;
      const paginationRows = rows.slice(start, start + pageSize);

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
        unassigned: unassigned === "true",
      });
    }
    res.json(assets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
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
      assigned_to
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
};
