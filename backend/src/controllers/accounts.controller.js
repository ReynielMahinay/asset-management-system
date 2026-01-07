const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getAccountByUsername } = require("../../db/queires/accountQueries");

async function login(req, res) {
  //getting the user and pass the was in the body request from frontend that was submitted by user
  const { username, password } = req.body;

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

    //if not create a token for that user that will expire within 1hr
    const token = jwt.sign(
      {
        id: account.id,
        role: account.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

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

module.exports = {
  login,
};
