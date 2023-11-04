const mongoose = require('mongoose')

// Creating the employee Schema
const employeeSchema = new mongoose.Schema({
    id: {
        type: String, 
        unique: true,
        required: true,
        default: () => Date.now().toString() // I took the date and convert it to String to use ad unique ID
    }, 
    lastName: {
        type: String, 
        required: true

    }, 
    firstName: {
        type: String, 
        required: true

    }, 
    dateCreated: {
        type: Date, 
        required: true, 
        default: Date.now

    }, 
    department: {
        type: String, 
        required: true

    }
})


module.exports = mongoose.model('Employee', employeeSchema)