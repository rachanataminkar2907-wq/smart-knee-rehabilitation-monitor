const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Knee Rehabilitation API is running",
    hardwareConnected: false,
    mode: "simulation",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;