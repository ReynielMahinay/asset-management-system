const epxress = require("express");
const router = epxress.Router();
const dashboardController = require("../controllers/dashboard.controller");

router.get("/", dashboardController.dashboardGet);

module.exports = router;
