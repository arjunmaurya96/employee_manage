const mongoose = require("mongoose");

const createEmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }, 
    number: { type: Number, required: true },
    designation: { type: String },
    gender: { type: String, required: true },
    course: { type: Array, required: true },
    imgUpload: { type: String },
    createdAt:{type:Date, default:Date.now} 
});

const createEmployee = mongoose.model('employee', createEmployeeSchema);

module.exports = createEmployee;
