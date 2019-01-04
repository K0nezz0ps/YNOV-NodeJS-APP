let app = require('express').Router();
let event_controller = require('../controllers/event_controller')
/**
 * @Mapping('/rest/User/*')
 */

app.route('/')
   .get(event_controller.getEvent)
   .post(event_controller.createEvent)

app.route('/Search')
   .get(event_controller.findEvent)

module.exports = app;