const ActivityLog = require('../models/activityLog.model');

// Fungsi untuk mengambil/melihat daftar activity log
exports.getActivityLogs = async (req, res) => {
  try {
    // Mengambil data log dari database, diurutkan dari yang paling baru
    const logs = await ActivityLog.find().sort({ created_at: -1 });
    
    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};