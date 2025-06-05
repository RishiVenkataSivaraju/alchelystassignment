const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobControllers");

router.post("/pause/:id", jobController.pauseJob);
router.post("/resume/:id", jobController.resumeJob);
router.post("/run/:id", jobController.runNow);
router.delete("/delete/:id", jobController.deleteJob);

module.exports = router;


