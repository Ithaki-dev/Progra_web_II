const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication routes
router.post('/auth/register', authController.register);
router.post('/auth/token', authController.login);

module.exports = router;
