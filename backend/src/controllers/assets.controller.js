const db = require('../../db/queries')

async function assetCreatePost(req, res){
    try{
        const {name, type, brand} = req.body
    console.log("Received data:", req.body);

        const newAsset = await db.insertAsset(name, type, brand);
        console.log("Inserted asset:", newAsset);
        res.json(newAsset);
    }catch (error){
        console.error("Error inserting asset: ", error)
         res.status(500).json({ error: "Database error" });
    }
}

async function assetGet(req, res){
    try{
        const assets = await db.getAsset()
        res.json(assets)
    }catch(err){
        console.error(err)
        res.status(500).json({error: "Database error"})
    }
}


module.exports = {
    assetCreatePost, assetGet
}