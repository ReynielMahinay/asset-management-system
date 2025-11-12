const express = require('express')
const router = express.Router();
const assetsController = require('../controllers/assets.controller')

router.post("/", assetsController.assetCreatePost);
router.get("/", assetsController.assetGet);
router.delete("/:id", assetsController.assetDelete)
module.exports = router;
 