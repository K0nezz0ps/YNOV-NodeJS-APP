let jwtFactory = require('jsonwebtoken');
let userModel  = require('../models/user_model')
let properties = require('../config/properties.js')

module.exports = {

    ADMIN: "ADMIN",
    USER: "USER",

    /**
     * GET the current User & return TRUE if it contains the provided Role
     * @param {*} JWToken 
     * @param {*} expectedRole 
     */
    validateCurrentUser(JWToken = String, expectedRole = String){
        
        // decode JWToken
        return jwtFactory.verify(userIdFromJWToken, properties.tokenKey, (err, decodedToken) => {

            if(!decodedToken)
                return false;

            // get User
            return userModel.findOne(decodedToken.payload.id, (err, user) => {

                // if found, check Roles
                if(user){
                    return validateAccess(user.roles, expectedRole);
                }
                else {
                    return false;
                }

            });
        }); 
    },

    /**
     * BOOLEAN Method that return TRUE if the userRole Array contains the provided exceptedRole
     * @param {*} userRole 
     * @param {*} expectedRole 
     */
    validateAccess(expectedRole = String){

        if(userRole == undefined || userRoles.length == 0 || expectedRole == undefined || expectedRole.trim().equals(""))
            return false;

        return userRole.contains(expectedRole);
    },

    getCurrentUser(req){

        // get JWToken from request (User)
        let cToken = req.headers['authorization'];

        cToken = cToken.split(" ")[1] || req.headers['x-access-token'];

        // get the decoded Token
        return jwtFactory.verify(cToken, properties.tokenKey);
    },

    /**
     * BOOLEAN Method that return throw a 403 error if the provided user is not an admin
     * @param {*} userRole 
     */
    validateAdmin(req){
        return this.getCurrentUser(req).isAdmin;
    },

    /**
     * MIDDLEWARE - Check that the HTTP Request contains a valid JWToken
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    validSession(req, res, next){

        // get JWToken from request (User)
        let cToken = req.headers['authorization'];

        // missing the JWToken from request (did the User deleted it manually ?)
        if(!cToken)
            res.status(400).json({status: "error", message: "Missing JWToken for authentication, please login."})

        cToken = cToken.split(" ")[1] || req.headers['x-access-token'];

        // verify it using the Factory (that create the Token on login too)
        jwtFactory.verify(cToken, properties.tokenKey, (err, decodedToken) => {

            // Token expired (timed-out) or invalid (hacking ?)
            if(err){
                // throw 401 (Unauthorized) error
                res.status(401).json({status: "error", message: err.message});
            }
            // Token is valid
            else {
                next();
            }
        });
    }
}