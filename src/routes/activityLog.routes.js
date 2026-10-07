const express = require('express');
const router = express.Router();
const { getActivityLogs } = require('../controllers/activityLog.controller');
// const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Activity Logs
 *   description: API untuk memantau aktivitas log sistem
 */

/**
 * @swagger
 * /api/activity-logs:
 *   get:
 *     summary: Mengambil daftar activity log
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar activity log
 *       401:
 *         description: Unauthorized / Token tidak valid
 */

// Karena di app.js nanti kita pasang di /api/activity-logs, maka cukup root (/)
router.get('/', getActivityLogs);

module.exports = router;