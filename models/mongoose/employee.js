const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

mongoose.model('Employee', employeeSchema);
module.exports = mongoose.model('Employee');
