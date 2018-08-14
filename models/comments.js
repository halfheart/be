const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  target_id: { type: mongoose.Schema.Types.ObjectId, ref: 'deck', required: true },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'comment', default: null },
  ut: { type: Date, default: Date.now }
})

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
