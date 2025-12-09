const pool = require("../pool")

async function insertUser(fullname, email, department, role){
    const result = await pool.query(
        `INSERT INTO users 
        (user_fullname, user_email, user_department, user_role) VALUES ($1, $2, $3, $4) RETURNING *`, [fullname, email, department, role]
    );

    return result.rows[0];
}


async function getUser({page = 1, pageSize = 5, sort = "user_id", order = "ASC" } = {}){

    const offset = (page - 1)  * pageSize;


    const {rows} = await pool.query(
        `SELECT * FROM users ORDER BY ${sort } ${order} LIMIT $1 OFFSET $2`,
        [pageSize, offset]
    )

    const {rows: countRows} = await pool.query("SELECT COUNT (*) AS total FROM users")

    const total = parseInt(countRows[0].total, 10)

    const data = rows.map(user => ({
        id: user.user_id,
        fullname: user.user_fullname,
        department: user.user_department,
        email: user.user_email,
        role: user.user_role
    }))

    return{total, data, page, pageSize}
}


async function updateUser(id, fullname, email, department, role){
    const result = await pool.query(
        `UPDATE users
        SET user_fullname = $1,
        user_email = $2, 
        user_department = $3,
        user_role = $4
        WHERE user_id = $5
        RETURNING *
        `,
        [fullname, email, department, role, id]
    )

    return result.rows[0]
}

async function deleteUser(id){
    const result = await pool.query(`DELETE FROM users WHERE user_id = $1 RETURNING *`, [id])
    return result.rowCount > 0;
}

module.exports = {insertUser, getUser, updateUser, deleteUser}