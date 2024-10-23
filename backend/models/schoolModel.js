const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name:{
        type: String,
        // required: true
    },
    location:{
        type: String,
        // required: true
    },
    EducationalProgramms:{
        type: String,
        // enum: ['Arts', 'culture', 'social welfare', 'theatre'],
        // required: true
    },
    Status:{
        type: String,
        // required: true
    },
    FutureGoals: {
        type: String,
        // required: true
    }
}, {timestamps: true})

const School = mongoose.model('schools', schoolSchema);
module.exports = School;