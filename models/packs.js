const mongoose = require('mongoose');

const packSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'pack', default: null }
});

module.exports = mongoose.model('pack', packSchema);
