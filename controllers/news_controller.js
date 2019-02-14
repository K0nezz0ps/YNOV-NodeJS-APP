let newsModel = require('../models/news_model')
let auth      = require('../utils/auth')

exports.getNews = function(req, res){

    // if provided id, get one
    if(req.params.id != undefined){
        newsModel.findById(req.params.id, (err, data) => {
            res.json(data);
        });
    }
    // else, get all
    else {
        newsModel.find({}, (err, data) => {
            res.json(data);
        });
    }
}

exports.createNews = function(req, res){

    // check that current user is an admin
    if(!auth.validateAdmin(req)){
        res.status(400).json({status: "error", message: "You are not authorized to perform this action."})
        return; 
    }   

    var newsBody         = {};
    newsBody.title       = req.body.title;
    newsBody.description = req.body.description;
    newsBody.author      = auth.getCurrentUser(req).id;

    // check that another news already use this title
    newsModel.findOne({'title': req.body.title}, (err, data) => {

        // no duplicate, create it
        if(!data){
            new newsModel(newsBody).save((error, news) => {
                res.status(302).json(news);
            });
        }
        // duplicate, throw 400 error
        else{
            res.status(400).json({status: "error", message: "This title is already for another news."})
        }
    });
}

exports.deleteNews = function(req, res){

    // check that current user is an admin
    if(!auth.validateAdmin(req)){
        res.status(400).json({status: "error", message: "You are not authorized to perform this action."})
        return; 
    }   

    newsModel.findOne({_id: req.body.newsId}, (err, data) => {

        if(!data){
            res.status(404).json({status: "error", message: "Requested News not found !"})
            return; 
        }
        else if(err){
            res.status(400).json({status: "error", message: "Internal Error Occured !"})
            return; 
        }

        data.remove((error) => {

            if(error){
                res.status(500).json(error);
                return;
            }
            else {
                res.status(200).json("Successfully Deleted");
                return;
            }
        });
    });
}

exports.updateNews = function(req, res){

    // check that current user is an admin
    if(!auth.validateAdmin(req)){
        res.status(400).json({status: "error", message: "You are not authorized to perform this action."})
        return; 
    }   

    newsModel.findOne({_id: req.body.newsId}, (err, data) => {
    
        if(!data){
            res.status(404).json({status: "error", message: "Requested News not found !"})
            return; 
        }
        else if(err){
            res.status(400).json({status: "error", message: "Internal Server Error."})
        }

        if(req.body.newTitle)
            data.title       = req.body.newTitle;
        if(req.body.newDescription)
            data.description = req.body.newDescription;

        data.save((error, news) => res.json(news));
    });
}