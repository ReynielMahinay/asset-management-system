const dbuser = require("../../db/queires/userQueries");

async function userCreatePost(req, res) {
  try {
    const { fullname, email, department, role } = req.body;
    console.log("Recieved data: ", req.body);

    const newUser = await dbuser.insertUser(fullname, email, department, role);
    console.log("User created:", newUser);

    res.json(newUser);
  } catch (error) {
    console.error("Error inserting user: ", error);
    res.status(500).json({ error: "Database error" });
  }
}

async function userGet(req, res) {
  try {
    const {
      page = 1,
      pageSize = 5,
      sort = "user_id",
      order = "asc",
      keyword = "",
    } = req.query;
    console.log("Query Params:", { page, pageSize, sort, order });

    let users;
    if (keyword) {
      const rows = await dbuser.searchUser(keyword);

      const start = (page - 1) * pageSize;
      const paginationRows = rows.slice(start, start + pageSize);

      users = {
        total: rows.length,
        page: Number(page),
        pageSize: Number(pageSize),
        data: paginationRows,
      };
    } else {
      users = await dbuser.getUser({
        page: Number(page),
        pageSize: Number(pageSize),
        sort,
        order: order.toUpperCase(),
      });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
}

async function userUpdate(req, res) {
  try {
    const { id } = req.params;
    const { fullname, email, department, role } = req.body;

    console.log("Updating asset", id, req.body);

    const updated = await dbuser.updateUser(
      id,
      fullname,
      email,
      department,
      role
    );

    if (!updated) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating the user: ", error);
    res.status(500).json({ error: "Database error" });
  }
}

async function userDelete(req, res) {
  try {
    const { id } = req.params;

    console.log("Deleting user with ID:", id);

    const deleted = await dbuser.deleteUser(id);

    if (deleted) {
      res.json({ message: "User deleted succesfuly" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).json({ error: "Database error" });
  }
}
module.exports = { userCreatePost, userGet, userUpdate, userDelete };
