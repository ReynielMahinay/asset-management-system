const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getAccountByUsername,
  getAccountById,
  getAccounts,
  createAccount,
  updateLastLogin,
} = require("../../db/queires/accountQueries");

async function login(req, res) {
  //getting the user and pass the was in the body request from frontend that was submitted by user
  const { username, password, rememberMe } = req.body;
  console.log("LOGIN BODY:", req.body);
  try {
    //checking if the username submitted by user is on the database
    const account = await getAccountByUsername(username);

    //if not return this status
    if (!account) return res.status(400).json({ msg: "Account not found!" });

    //If existing user it will check the password from the request body to the hash password from the data base by
    //By hashing the inputed password to and compare both if the same
    const isMatch = await bcrypt.compare(password, account.password_hash);

    //wrong password return error
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    // Wait for last_login update to complete
    // so frontend fetches the latest login time immediately
    await updateLastLogin(account.id);

    //if not create a token for that user that will expire within 1hr
    const token = jwt.sign(
      {
        id: account.id,
        role: account.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    if (rememberMe) {
      console.log("SETTING REFRESH TOKEN COOKIE");
      const refreshToken = jwt.sign(
        {
          id: account.id,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" },
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    //return this json on the frontend to use
    res.json({
      token,
      user: { id: account.id, username: account.username, role: account.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

async function refreshToken(req, res) {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ msg: "No refresh token" });
  }

  jwt.verify(token, process.env.JWT_REFESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    res.json({ token: newAccessToken });
  });
}

async function userProfile(req, res) {
  try {
    const user = await getAccountById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function getUserAccounts(req, res) {
  try {
    const { page = 1, pageSize = 5 } = req.query;

    const users = await getAccounts(Number(page), Number(pageSize));

    if (!users || users.length === 0)
      return res.status(404).json({ msg: "No data" });

    res.json({
      page: Number(page),
      pageSize: Number(pageSize),
      data: users.rows, // only rows array
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function accountCreatePost(req, res) {
  try {
    const { username, password, role, email } = req.body;

    const allowedRoles = ["admin", "manager"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const newAccount = await createAccount(username, password, role, email);

    console.log("Insert new account", newAccount);
    res.json(newAccount);
  } catch (error) {
    console.error("Error inserting account", error);
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = {
  login,
  userProfile,
  getUserAccounts,
  accountCreatePost,
  refreshToken,
};
