let app             = require('express').Router();
let user_controller = require('../controllers/user_controller')

/**
 * @Mapping('/rest/User/*')
 */

app.route('/')
/**
 * @swagger
 * /rest/User@POST:
 *   post:
 *     description: Access to User
 */
   .get(user_controller.getUser)
/**
 * @swagger
 * /rest/User@PUT:
 *   post:
 *     description: Update User values
 */
   .put(user_controller.updateUser)

app.route('/:id')
/**
 * @swagger
 * /rest/User:id@GET:
 *   post:
 *     description: Access to User
 */
   .get(user_controller.getUser)

module.exports = app;