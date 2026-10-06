const express = require('express');
const router = express.Router();
const { getActivityLogs } = require('../controllers/activityLog.controller');
// const { protect } = require('../middlewares/auth.middleware'); // Uncomment jika butuh proteksi login

// Endpoint untuk GET activity logs
router.get('/activity-logs', getActivityLogs);

module.exports = router;