const Event = require('../models/eventModel');


module.exports.Event_get = async(req, res) => {
    try{
        const Events =  await Event.find({}).sort({CreatedAt: -1})
        if(!Events){
            res.status(404).json({mssg: 'No Events found'})
        }
        res.status(200).json(Events)
    } catch (error) {
        res.status(400).json({Error: error})
    }
}

module.exports.Event_getbyId = async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            res.status(400).json({error: "Event ID is required." })
        }
        const Events =  await Event.findById(id)
        if(!Events){
            res.status(404).json({mssg: 'No Events found'})
        }
        res.status(200).json(Events)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

module.exports.Event_post = async(req, res) => {
    try{
        const Event = await Event.create({...req.body});
        res.status(201).json(Event)

    } catch (error) {
        res.status(400).json({error: error})
    }
}


module.exports.Event_update = async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            res.status(400).json({error: "Event ID is required." })
        }
        const updates =  await Event.findByIdAndUpdate({_id: id}, {$set: {...req.body}})
        if(!updates){
            res.status(404).json({mssg: 'No updates found'})
        }
        res.status(200).json(updates)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

module.exports.Event_delete = async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            res.status(400).json({error: "Event ID is required." })
        }
        const EventDeleted =  await Event.findByIdAndDelete({_id: id})
        if(!EventDeleted){
            res.status(404).json({mssg: 'No Event Deleted'})
        }
        res.status(200).json(EventDeleted)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

