const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

router.get("/overview", analyticsController.overview);
router.get("/visitors-chart", analyticsController.visitorsChart);
router.get("/top-pages", analyticsController.topPages);
router.get("/cities", analyticsController.cityVisitors);
router.get("/traffic-sources", analyticsController.trafficSources);
router.get("/countries", analyticsController.countryVisitors);
router.get("/devices", analyticsController.deviceBreakdown);
router.get("/browsers", analyticsController.browserBreakdown);

module.exports = router;
