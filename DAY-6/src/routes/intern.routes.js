const express = require("express");
const router = express.Router();
const controller = require("../controllers/intern.controller");

router.get("/health",controller.checkHealth);
router.get("/search", controller.searchIntern);
router.get("/:id", controller.getInternById);
router.get("/", controller.getAllInterns);
router.post("/", controller.createIntern);
router.put("/:id", controller.updateIntern);
router.delete("/:id", controller.disableIntern);

module.exports = router;