const express = require('express');
const router = express.Router();
const { getActivityLogs } = require('../controllers/activityLog.controller');
// const { protect } = require('../middlewares/auth.middleware');

// Karena di app.js nanti kita pasang di /api/activity-logs, maka cukup root (/)
router.get('/', getActivityLogs);

module.exports = router;