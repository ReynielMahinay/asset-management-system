const { supabaseAdmin } = require("../supabaseAdmin");
const bcrypt = require("bcrypt");

async function getAccountByUsername(identifier) {
  const { data, error } = await supabaseAdmin
    .from("accounts")
    .select("*")
    .or(`username.eq.${identifier},email.eq.${identifier}`)
    .single();

  if (error) {
    console.error("getAccountByUsername error:", error.message);
    return null;
  }

  return data;
}

async function getAccountById(userId) {
  const { data, error } = await supabaseAdmin
    .from("accounts")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("getAccountById error:", error.message);
    return null;
  }

  return data;
}

async function getAccounts(page = 1, pageSize = 5) {
  const offset = (page - 1) * pageSize;

  const { data: rows, error } = await supabaseAdmin
    .from("accounts")
    .select("id, username, role, email, created_at")
    .order("id", { ascending: true })
    .range(offset, offset + pageSize - 1);

  if (error) {
    console.error("getAccounts error:", error.message);
    return { rows: [], page, pageSize };
  }

  return { rows, page, pageSize };
}

async function createAccount(username, password, role, email) {
  const hashpassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabaseAdmin
    .from("accounts")
    .insert([{ username, password_hash: hashpassword, role, email }])
    .select()
    .single();

  if (error) {
    console.error("createAccount error:", error.message);
    return null;
  }

  return data;
}

async function updateLastLogin(userId) {
  const { error } = await supabaseAdmin
    .from("accounts")
    .update({ created_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    console.error("updateLastLogin error:", error.message);
  }
}

module.exports = {
  getAccountByUsername,
  getAccountById,
  getAccounts,
  createAccount,
  updateLastLogin,
};
