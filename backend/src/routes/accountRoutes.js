const express = require("express");
const router = express.Router();
const { login } = require("../controllers/accounts.controller");
const { auth } = require("../middleware/auth");

//for posting data from frontend to backend
router.post("/", login);

//after successfull login it will send the user profile to frontend but checking first if the user is authenticated by token
router.get("/me", auth, (req, res) => {
  res.json({
    message: "Auth works ✅",
    user: req.user,
  });
});

module.exports = router;
