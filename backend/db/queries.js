const pool = require('./pool')

async function insertAsset(name, type, brand){
    await pool.query("INSERT INTO assets (name, type, brand) VALUES ($1, $2, $3) RETURNING *", 
        [name, type, brand]);
    return result.rows[0];
}

module.exports = {insertAsset}