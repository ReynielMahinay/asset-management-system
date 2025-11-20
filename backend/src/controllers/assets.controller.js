const db = require('../../db/queries')

async function assetCreatePost(req, res){
    try{
        const {name, type, brand, tag, status, assigned_to = null } = req.body
    console.log("Received data:", req.body);

        const newAsset = await db.insertAsset(name, type, brand, tag, status, assigned_to);
        console.log("Inserted asset:", newAsset);
        res.json(newAsset);
    }catch (error){
        console.error("Error inserting asset: ", error)
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
    } = req.query;

    const assets = await db.getAsset({
      page: Number(page),
      pageSize: Number(pageSize),
      sort,
      order: order.toUpperCase(),
    });

    res.json(assets);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}


async function assetDelete(req, res){
    try{
        const {id} = req.params;

        console.log("Deleting asset with ID", id);

        const deleted = await db.deleteAsset(id);

        if(deleted){
            res.json({message: "Asset deleted successfuly"})
        }else{
            res.status(404).json({error: "Asset not found"})
        }
    } catch(error){
        console.error("Error deleting asset: ", error)
        res.status(500).json({error: "Database error"})
    }
}

async function assetUpdate(req, res){

  try{
    const {id} = req.params;
    const {name, type, brand, tag, status, assigned_to = null} = req.body;

    console.log("Updating asset", id, req.body)

    const updated = await db.updateAsset(id, name, type, brand, tag, status, assigned_to)

    if(!updated){
      return res.status(404).json({error: "Asset not found"})
    }

    res.json(updated)
  } catch(error){
    console.error("Error updating asset:", error);
    res.status(500).json({error: "Database error"})
  }
  
}

module.exports = {
    assetCreatePost, assetGet, assetDelete, assetUpdate
}