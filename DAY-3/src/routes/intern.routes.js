const express = require("express");
const router = express.Router();

const controller = require("../controllers/intern.controller");

router.get("/health",controller.checkHealth);
router.get("/:id", controller.getInternById);

module.exports = router;