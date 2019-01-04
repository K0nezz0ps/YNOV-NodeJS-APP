let app = require('express').Router();
let login_controller = require('../controllers/login_controller')
/**
 * @Mapping('/rest/User/*')
 */

app.route('/login')
   .post(login_controller.login)

module.exports = app;