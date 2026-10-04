const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorization.middleware');

router.use(authenticate);
router.use(authorize('Admin'));

router.get('/stats', dashboardController.getDashboardStats);

module.exports = router;
