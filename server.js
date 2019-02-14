let express       = require('express');
let mongoose      = require('mongoose');
let bodyParser    = require('body-parser');
let cors          = require('cors');

let auth          = require('./utils/auth');

let user_route    = require('./routes/user_route.js');
let news_route    = require('./routes/news_route.js');
let login_route   = require('./routes/login_route.js');
let comment_route = require('./routes/comment_route.js');

let app = initServer(4300);

// RestAPI - EndPoint Mapping
app.use('/auth'         , login_route);                      // LOGIN
app.use('/rest/User'    , auth.validSession, user_route);    // USER
app.use('/rest/News'    , auth.validSession, news_route);    // EVENT
app.use('/rest/Comment' , auth.validSession, comment_route); // COMMENT

// INIT an Express Server
function initServer(port){

    console.log("Starting Express Server...")
    let app = express();

    const mongodb_config = require('./config/mongo_config')
    mongoose.connect(mongodb_config.databaseUrl, {useNewUrlParser: true}); 
    console.log("MongoServer connected to " + mongodb_config.databaseUrl);

    console.log("Enabling other domains access...")
    app.use(cors());
    console.log("Ok");

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    app.listen(port);
    console.log("Listening on port "+ port);

    console.log("Server Started !");

    initSwagger(app);

    return app; 

}

// INIT Swagger & map to provided app
function initSwagger(app){
    
    var swaggerJSDoc = require('swagger-jsdoc');

    // swagger definition
    var swaggerDefinition = {
        info: {
            title: 'Node Swagger API',
            version: '1.0.0',
            description: 'Demonstrating how to describe a RESTful API with Swagger',
        },
        host: 'localhost:4300',
        basePath: '/'
    };

    // options for the swagger docs
    var options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./routes/*.js']
    };

    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);

    // serve swagger
    app.get('/api-docs', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

module.exports = app;