const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        // required: true
    },
    category:{
        type: String,
        enum: ['Education', 'Health', 'Environment', 'Technology'], // Example enum values
        required: true
    },
    StartDate:{
        type: Date,
        required: true
    },
    EndDate:{
        type: Date,
        required: true
    },
    Status:{
        type: String,
        enum: ['ongoing', 'upcoming', 'completed'],
        required: true,
        default: 'upcoming'
    },
    ImpactMetrics:{
        type: String,
        // required: true
    }
}, {timestamps: true})

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;