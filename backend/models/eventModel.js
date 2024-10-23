const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    ProjectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        required: true
    },
    catogory:{
        type: String,
        enum: ['eduction', 'culture', 'social welfare'],
        required: true
    },
    StartDate:{
        type: String,
        required: true
    },
    EndDate:{
        type: String,
        required: true
    },
    Status:{
        type: Boolean,
        required: true
    },
    Contribution:{
        type: [String],
        required: true
    },
    ImpactMetrics:{
        type: String,
        required: true
    }
}, {timestamps: true})

const Event = mongoose.model('events', eventSchema);
module.exports = Event;