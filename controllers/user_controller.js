let userModel = require('../models/user_model')

/**
 * @RequestMapping @GET /rest/User
 */
exports.getUser = function(req, res){

    // if provided id, get one
    if(req.params.id != undefined){
        userModel.findById(req.params.id, (err, data) => {
            res.json(extractData(err, data));
        });
    }
    // else, get all
    else {
        userModel.find({}, (err, data) => {
            res.json(extractData(err, data));
        });
    }
}

/**
 * @RequestMapping @POST /rest/User
 */
exports.createUser = function(req, res){

    let nUser = new userModel(req.body);

    nUser.save((err, data) => res.json(extractData(err, data)));
}
