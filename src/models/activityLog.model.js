const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  todo_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  snapshot: {
    title: { type: String, required: true }
  },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);