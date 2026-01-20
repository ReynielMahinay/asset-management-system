const pool = require("../pool");
const bcrypt = require("bcrypt");

// getting/Selecting the data row with the username is. it was inputed by the user
async function getAccountByUsername(username) {
  const result = await pool.query(
    "SELECT * FROM accounts WHERE username = $1",
    [username],
  );

  return result.rows[0];
}

async function getAccountById(userId) {
  const result = await pool.query("SELECT * FROM accounts WHERE id = $1", [
    userId,
  ]);

  return result.rows[0];
}

async function getAccounts(page = 1, pageSize = 5) {
  const offset = (page - 1) * pageSize;

  const { rows } = await pool.query(
    "SELECT id, username, role, email FROM accounts ORDER BY id LIMIT $1 OFFSET $2",
    [pageSize, offset],
  );

  return { rows, page, pageSize };
}

async function createAccount(username, password, role, email) {
  const hashpassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO accounts (username, password_hash, role, email) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, hashpassword, role, email],
  );

  return result.rows[0];
}

module.exports = {
  getAccountByUsername,
  getAccountById,
  getAccounts,
  createAccount,
};
