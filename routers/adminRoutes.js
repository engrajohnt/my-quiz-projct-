// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

// Add admin routes and middleware as needed
router.get('/dashboard', authenticateAdmin, adminController.getDashboard);

module.exports = router;
