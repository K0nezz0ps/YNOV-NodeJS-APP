let userModel  = require('../models/user_model');
let jwtFactory = require('jsonwebtoken');
let properties = require('../config/properties.js')

/**
 * @RequestMapping @POST /auth/signin
 */
exports.login = function(req, res){

    console.log(req);

    // get parameters
    const email = req.body.email;
    const pass  = req.body.password; // crypt with sha1

    if(email == undefined || email.trim() == "" || pass == undefined){
        res.status(400).json({success: false, message: 'Incorrect input, missing email and/or password.'}) 
        return;
    }

    // match the user
    userModel.findOne({email: email.trim(), password: pass}, (err, data) => {
        
        // found
        if(data){

            // create JWT
            const JWToken = jwtFactory.sign({id: data._id, name: data.lastName, email: data.email, isAdmin: data.isAdmin}, properties.tokenKey, {expiresIn: 1200});

            // return, not as a cookie for a generique behavior in each FRONT part (angular, mobile...)
            res.json({"JWT": JWToken, success: true, user: data.firstName, message: "Successfully logged in."});
        }
        else{
            // unfound -> reject
            res.status(404).json({success: false, message: 'Login or password unknown/incorrect.'})
        }
    });
}

/**
* @RequestMapping @POST /auth/signup
*/
exports.createUser = function(req, res){

    // get parameters
    const lastName        = req.body.lastName;
    const firstName       = req.body.firstName;
    const email           = req.body.email;
    const password        = req.body.password; // crypt with sha1
    const confirmPassword = req.body.confirmPassword; // crypt with sha1

    console.log(email + " == " + password + " == " + confirmPassword + " == " + lastName + " == " + firstName);

    if(lastName == undefined || firstName == undefined || email == undefined || password == undefined || confirmPassword == undefined){
    res.status(400).json({success: false, message: 'Incorrect input, missing required field(s).'});
    return;
    }
    else if(lastName.trim() == "" || firstName.trim() == "" || email.trim() == "" || email.indexOf('@') == -1){
    res.status(400).json({success: false, message: 'Incorrect input, please provide all fields.'});
    return;
    }
    else if(password.trim().length < 4){
    res.status(400).json({success: false, message: 'Password must have a minimal size of 4 caracters.'});
    return;
    }
    else if(password != confirmPassword){
    res.status(400).json({success: false, message: 'Both passwords are different.'});
    return;
    }

    // already existing user ?
    userModel.findOne({email: email, password: password}, (err, data) => {
    
    // found   -> user already exist, throw error
    if(data)
        res.status(400).json({success: false, message: 'This user already exist, please try another one.'}) 
    // unfound -> create user
    else
        new userModel(req.query).save((error, user) => res.json(user));
    });
}