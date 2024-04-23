const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  avatar: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
