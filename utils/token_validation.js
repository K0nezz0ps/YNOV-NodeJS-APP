let jwtFactory = require('jsonwebtoken');
let properties = require('../config/properties.js')

module.exports = (req, res, next) => {

    // get JWToken from request (User)
    let cToken = req.headers['authorization'].split(" ")[1] || req.headers['x-access-token'];

    // missing the JWToken from request (did the User deleted it manually ?)
    if(!cToken)
        res.status(400).json({status: "error", message: "Missing JWToken for authentication, please login."})

    // verify it using the Factory (that create the Token on login too)
    jwtFactory.verify(cToken, properties.tokenKey, (err, decodedToken) => {

        // Token expired (timed-out) or invalid (hacking ?)
        if(err){

            // throw 401 (Unauthorized) error
            res.status(401).json({status: "error", message: err.message});

        }
        // Token is valid
        else {
            console.log("VALID JWToken provided, calling next() method to continue...");
            next();
        }
    });
}