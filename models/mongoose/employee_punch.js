const mongoose = require('mongoose');

const employeePunchSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  punchTime: { type: mongoose.Schema.Types.Date },
});
mongoose.model('EmployeePunch', employeePunchSchema);
module.exports = mongoose.model('EmployeePunch');
