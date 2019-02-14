let userModel = require('../models/user_model')

/**
 * @RequestMapping @GET /rest/User
 */
exports.getUser = function(req, res){

    // if provided id, get one
    if(req.params.id != undefined){
        userModel.findById(req.params.id, (err, data) => {
            res.json(data);
        });
    }
    // else, get all
    else {
        userModel.find({}, (err, data) => {
            res.json(data);
        });
    }
}

exports.updateUser = function(req, res){

    const cUserId = auth.getCurrentUser(req).id;

    // SECURITY - check that requester & target have the same ID
    if(req.body.userId != cUserId && !auth.validateAdmin(req)){
        res.status(403).json({status: "error", message: "You are not authorized to perform this action."})
        return; 
    }

    userModel.find({_id: req.body.userId}, (error, data) => {

        if(!data){
            res.status(404).json({status: "error", message: "User not found for the provided ID"});
            return; 
        }
        else if(err){
            res.status(500).json({status: "error", message: "Internal Server Error."})
            return; 
        }

        if(req.body.newLastName != undefined)
            data.lastName = req.body.newLastName;
        if(req.body.newFirstName != undefined)
            data.firstName = req.body.newFirstName;
        if(req.body.newPassword != undefined)
            data.password = req.body.newPassword;
        if(req.body.newIsAdmin != undefined)
            data.isAdmin = req.body.newIsAdmin;
        
        data.save((error, user) => res.json(user));   

    });

}