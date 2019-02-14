let app = require('express').Router();
let login_controller = require('../controllers/login_controller')

/**
 * @Mapping('/auth/*')
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     description: User Authentication to API
 *     produces:
 *       - application/json
 *     parameters:
 *       - email: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return a JWToken
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: Unfound user
 */
app.route('/signin')
   .post(login_controller.login)

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: User Account Creation
 *     produces:
 *       - application/json
 *     parameters:
 *       - email: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return a JWToken
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: Unfound user
 */
app.route('/signup')
   .post(login_controller.createUser)

module.exports = app;