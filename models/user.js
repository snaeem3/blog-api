const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  displayName: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, unique: true, maxLength: 100 },
  password: { type: String, required: true, minLength: 6 },
  admin: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('User', UserSchema);
