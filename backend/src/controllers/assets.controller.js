const db = require('../db/queries')

async function assetCreatePost(req, res){
    try{
        const {name, type, brand} = req.body

        const newAsset = await db.insertAsset({name, type, brand});
        res.json(newAsset);
    }catch (error){
        console.error("Error inserting asset: ", error)
         res.status(500).json({ error: "Database error" });
    }
}


module.exports = {
    assetCreatePost
}