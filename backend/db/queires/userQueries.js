const pool = require("../pool")

async function insertUser(fullname, email, department, role){
    const result = await pool.query(
        `INSERT INTO users 
        (user_fullname, user_email, user_department, user_role) VALUES ($1, $2, $3, $4) RETURNING *`, [fullname, email, department, role]
    );

    return result.rows[0];
}


module.exports = {insertUser}