const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: false },
  end: { type: Date, required: false },
  recurring: { type: Boolean, required: true },
  recurringType: { type: String },
  assigned: { type: Boolean, required: true },
  assignedDate: { type: Date },
  status: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [taskSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
