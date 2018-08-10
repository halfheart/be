const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, unique: true },
  pwd: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  active: { type: Boolean, default: false }
});

const User = mongoose.model('user', userSchema);
module.exports = User;
