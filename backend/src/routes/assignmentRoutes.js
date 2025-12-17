const express = require("express");
const router = express.Router();
const { assignedAsset } = require("../controllers/assignment.controller");

router.post("/", assignedAsset);

module.exports = router;
