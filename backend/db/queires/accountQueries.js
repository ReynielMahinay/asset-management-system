const pool = require("../pool");

// getting/Selecting the data row with the username is. it was inputed by the user
async function getAccountByUsername(username) {
  const result = await pool.query(
    "SELECT * FROM accounts WHERE username = $1",
    [username]
  );

  return result.rows[0];
}

module.exports = { getAccountByUsername };
