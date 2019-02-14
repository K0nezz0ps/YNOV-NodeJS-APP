let commentModel = require('../models/comment_model')
let auth      = require('../utils/auth')

exports.getComment = function(req, res){

    // provided COMMENT ID - get comment
    if(req.params.id != undefined){
        commentModel.findById(req.params.id, (err, data) => {
            res.json(data);
        });
    }
    // provided NEWS ID - get all related comment
    else if(req.params.newsId != undefined) {
        commentModel.find({'newsId': req.params.newsId}, (err, data) => {
            res.json(data);
        });
    }
    // provided USER ID - get user comments
    else if(req.params.userId != undefined){
        commentModel.find({'author': req.params.userId}, (err, data) => {
            res.json(data);
        });
    }
    // nothing provided GET ALL - *GET*
    else {
        commentModel.find({}, (err, data) => {
            res.json(data);
        });
    }
}

exports.createComment = function(req, res){

    if(req.body.content == undefined || req.body.content.trim() == "" || req.body.newsId == undefined || req.body.newsId.trim() == ""){
        res.status(400).json({status: "error", message: "Incorrect input, please provided all fields."})
        return; 
    }

    var commentBody      = {};
    commentBody.content  = req.body.content;
    commentBody.newsId   = req.body.newsId;
    commentBody.author   = auth.getCurrentUser(req).id;

    new commentModel(commentBody).save((error, news) => {
        res.status(302).json(news);
    });
}

exports.updateComment = function(req, res){

    const cUserId = auth.getCurrentUser(req).id;

    // FIND comment by provided ID & current User
    commentModel.find({'author': cUserId, _id: req.body.id}, (err, data) => {

        if(!data){
            res.status(404).json({status: "error", message: "Comment not found for the provided ID with your account"})
            return; 
        }
        else if(err){
            res.status(500).json({status: "error", message: "Internal Server Error."})
            return; 
        }

        if(req.body.newContent != undefined)
            data.content = req.body.newContent;
            data.save((error, comment) => res.json(comment));
    });
}

exports.deleteComment = function(req, res){

    const cUserId = auth.getCurrentUser(req).id;

    // FIND comment by provided ID & current User
    commentModel.find({'author': cUserId, _id: req.body.id}, (err, data) => {

        if(!data){
            res.status(404).json({status: "error", message: "Comment not found for the provided ID with your account"})
            return; 
        }
        else if(err){
            res.status(500).json({status: "error", message: "Internal Server Error."})
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