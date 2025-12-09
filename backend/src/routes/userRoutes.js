const express = require('express')
const router = express.Router()
const usersController = require("../controllers/users.controller")

router.post("/", usersController.userCreatePost)
router.get("/", usersController.userGet)
router.put("/:id", usersController.userUpdate)
router.delete("/:id", usersController.userDelete)

module.exports = router;