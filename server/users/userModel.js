var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  github: String
});

module.exports = mongoose.model('User', UserSchema);
