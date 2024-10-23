const School = require('../models/schoolModel');

module.exports.School_get = async(req, res) => {
    try{
        const Schools =  await School.find({}).sort({CreatedAt: -1})
        if(!Schools){
            res.status(404).json({mssg: 'No Schools found'})
        }
        res.status(200).json(Schools)
    } catch (error) {
        res.status(400).json({Error: error})
    }
}

module.exports.School_getbyId = async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            res.status(400).json({error: "School ID is required." })
        }
        const Schools =  await School.findById(id)
        if(!Schools){
            res.status(404).json({mssg: 'No Schools found'})
        }
        res.status(200).json(Schools)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

module.exports.School_post = async(req, res) => {
    try{
        const school = await School.create({...req.body});
        res.status(201).json(school)

    } catch (error) {
        res.status(400).json(error)
    }
}


module.exports.School_update = async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            res.status(400).json({error: "School ID is required." })
        }
        const updates =  await School.findByIdAndUpdate({_id: id}, {$set: {...req.body}})
        if(!updates){
            res.status(404).json({mssg: 'No updates found'})
        }
        res.status(200).json(updates)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

module.exports.School_delete = async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            res.status(400).json({error: "School ID is required." })
        }
        const SchoolDeleted =  await School.findByIdAndDelete({_id: id})
        if(!SchoolDeleted){
            res.status(404).json({mssg: 'No School Deleted'})
        }
        res.status(200).json(SchoolDeleted)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

