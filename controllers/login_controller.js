let userModel  = require('../models/user_model');
let jwtFactory = require('jsonwebtoken');
let properties = require('../config/properties.js')

/**
 * @RequestMapping @POST /auth/login
 */
exports.login = function(req, res){

    // get parameters
    const login = req.body.login;
    const pass  = req.body.password; // crypt with sha1

    // match the user
    userModel.findOne({name: login, password: pass}, (err, data) => {
        
        // found
        if(data){

            // create JWT
            const JWToken = jwtFactory.sign({id: data._id, name: login, email: data.email}, properties.tokenKey, {expiresIn: 1200});

            // return, not as a cookie for a generique behavior in each FRONT part (angular, mobile...)
            res.json({"JWT": JWToken, success: true, message: "Successfully logged in."});
        }
        else{
            // unfound -> reject
            res.status(400).json({success: fals, message: 'Login or password unknown/incorrect.'})
        }

    });
}