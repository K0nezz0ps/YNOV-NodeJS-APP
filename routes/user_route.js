let app             = require('express').Router();
let user_controller = require('../controllers/user_controller')

/**
 * @Mapping('/rest/User/*')
 */

app.route('/')
   .get(user_controller.getUser)
   .post(user_controller.createUser)

app.route('/:id')
   .get(user_controller.getUser)

module.exports = app;