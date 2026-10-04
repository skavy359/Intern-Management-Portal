const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticate = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { validateLogin } = require('../validators/auth.validator');

router.post('/login', validate(validateLogin), authController.login);

router.get('/me', authenticate, authController.getMe);

module.exports = router;
