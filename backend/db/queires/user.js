const { supabaseAdmin } = require("../supabaseAdmin");

async function insertUser(fullname, email, department, role) {
  const { data, error } = await supabaseAdmin
    .from("users")
    .insert({
      //mapping to match the table column name
      user_fullname: fullname,
      user_email: email,
      user_department: department,
      user_role: role,
    })
    .select() // returning what is created on supabase
    .single(); // unwrap from array since we're inserting one row

  if (error) {
    console.error("insertUser error: ", error.message);
    return null;
  }

  return data;
}

async function getUser({
  page = 1,
  pageSize = 5,
  sort = "user_id",
  order = "ASC",
} = {}) {
  const offset = (page - 1) * pageSize; // to set the page start at 0 meaning index 0 on the user table

  const { data: rows, error } = await supabaseAdmin
    .from("users")
    .select(
      `
    user_id,
    user_fullname,
    user_email,
    user_department,
    user_role,
    asset_assignments ( 
        assets (
        asset_name
            )
        )`, // this how th left join works on supabase no need alias just need the table name and column
    )
    .order(sort, { ascending: order.toLocaleLowerCase() === "asc" })
    .range(offset, offset + pageSize - 1); // to set the table content to index 0 and 4 from the user table

  if (error) {
    console.log("getUser error: ", error.message);
    return null;
  }

  const { count, error: countError } = await supabaseAdmin
    .from("users")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.log("getUser count error", countError.message);
    return null;
  }

  const data = rows.map((user) => ({
    id: user.user_id,
    fullname: user.user_fullname,
    email: user.user_email,
    department: user.user_department,
    role: user.user_role,
    assets:
      user.asset_assignments.lenght > 0
        ? user.asset_assignments
            .map((aa) => aa.assets.asset_assignments)
            .join(",")
        : "No Assets",
  }));

  return { total: count, data, page, pageSize };
}

async function searchUser(keyword) {
  const { data: result, error } = await supabaseAdmin
    .from("users")
    .select("user_id, user_fullname, user_department, user_email,user_role")
    .or(`user_fullname.ilike.%${keyword}%,user_email.ilike.%${keyword}%`)
    .limit(50);

  if (error) {
    console.error("searchUser error", error.message);
    return null;
  }

  return result.map((user) => ({
    id: user.user_id,
    fullname: user.user_fullname,
    department: user.user_department,
    email: user.user_email,
    role: user.user_role,
  }));
}

module.exports = { insertUser, getUser, searchUser };
