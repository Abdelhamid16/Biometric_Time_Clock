// This the check model for both check in & check out endpoints
const mongoose = require('mongoose')
// to identify which check we are doing, as i mentioned {0 for check in, 1 for check out}
const { CHECK_IN } = require('../helpers/constants') 

// Create the check Shcema
const checkSchema = new mongoose.Schema({
    employeeId: {
        type: String, 
        required: true,
    }, 
    comment: {
        type: String, 
        required: true,
        default: ""
    },
    date: {
        type: Date, 
        required: true, 
        default: Date.now,
    },
    // 0 --> check in
    // 1 --> check out
    // This is the type to choose the check (In/Out)
    type: {
        type: Number,
        required: true,
        default: CHECK_IN
    }
})


module.exports = mongoose.model('Check', checkSchema)