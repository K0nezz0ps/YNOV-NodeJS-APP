let express     = require('express');
let mongoose    = require('mongoose');
let bodyParser  = require('body-parser');

let user_route  = require('./routes/user_route.js');
let event_route = require('./routes/event_route.js');
let login_route = require('./routes/login_route.js');

let app = initServer(4300);

app.use('/rest/User' , user_route);  // USER
app.use('/rest/Event', event_route); // EVENT
app.use('/auth'      , login_route); // LOGIN

// INIT an Express Server
function initServer(port){

    console.log("Starting Express Server...")
    let app = express();

    app.listen(port);
    console.log("Listening on port "+ port);

    console.log("Server Started !");

    const mongodb_config = require('./config/mongo_config')
    mongoose.connect(mongodb_config.databaseUrl, {useNewUrlParser: true}); 
    console.log("MongoServer connected to " + mongodb_config.databaseUrl);

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    console.log("Parsers enabled");

    return app; 

}

module.exports = app;