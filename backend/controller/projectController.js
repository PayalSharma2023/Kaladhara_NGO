const Project = require('../models/projectModel');

module.exports.project_get = async(req, res) => {
    try{
        const projects =  await Project.find({}).sort({CreatedAt: -1})
        if(!projects){
            res.status(404).json({mssg: 'No projects found'})
        }
        res.status(200).json(projects)
    } catch (error) {
        res.status(400).json({Error: error})
    }
}

module.exports.project_getbyId = async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            res.status(400).json({error: "Project ID is required." })
        }
        const projects =  await Project.findById(id)
        if(!projects){
            res.status(404).json({mssg: 'No projects found'})
        }
        res.status(200).json(projects)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

module.exports.project_post = async(req, res) => {
    try{
        const project = await Project.create({...req.body});
        res.status(201).json(project)

    } catch (error) {
        res.status(400).json({error: error})
    }
}


module.exports.project_update = async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            res.status(400).json({error: "Project ID is required." })
        }
        const updates =  await Project.findByIdAndUpdate({_id: id}, {$set: {...req.body}})
        if(!updates){
            res.status(404).json({mssg: 'No updates found'})
        }
        res.status(200).json(updates)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

module.exports.project_delete = async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            res.status(400).json({error: "Project ID is required." })
        }
        const projectDeleted =  await Project.findByIdAndDelete({_id: id})
        if(!projectDeleted){
            res.status(404).json({mssg: 'No project Deleted'})
        }
        res.status(200).json(projectDeleted)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

