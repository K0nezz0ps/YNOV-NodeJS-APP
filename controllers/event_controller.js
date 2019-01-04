let eventModel = require('../models/event_model')

exports.getEvent = function(req, res){

    // if provided id, get one
    if(req.params.id != undefined){
        eventModel.findById(req.params.id, (err, data) => {
            res.json(extractData(err, data));
        });
    }
    // else, get all
    else {
        eventModel.find({}, (err, data) => {
            res.json(extractData(err, data));
        });
    }
}

exports.createEvent = function(req, res){
    res.json("POST EVENT");
}

exports.findEvent = function(req, res){
    res.json("FIND EVENT");
}