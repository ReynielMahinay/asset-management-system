const express = require('express')
const router = express.Router();
const assetsController = require('../controllers/assets.controller')

router.post("/", assetCreate);

module.exports = router;
 