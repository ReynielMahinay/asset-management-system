const express = require("express");
const router = express.Router();
const {
  login,
  userProfile,
  getUserAccounts,
  accountCreatePost,
} = require("../controllers/accounts.controller");
const { auth, isAdmin } = require("../middleware/auth");

//for posting data from frontend to backend
router.post("/", login);

//after successfull login it will send the user profile to frontend but checking first if the user is authenticated by token
router.get("/me", auth, userProfile);

//Since this is for Admin only account need to protect this API route and check the token of the user is assign as admin
router.get("/accounts", auth, isAdmin, getUserAccounts);
router.post("/newAccount", accountCreatePost);

module.exports = router;
