let app = require('express').Router();
let news_controller = require('../controllers/news_controller')

/**
 * @Mapping('/rest/User/*')
 */

app.route('/')
/**
 * @swagger
 * /rest/News@GET:
 *   post:
 *     description: Access to News(s)
 */
   .get(news_controller.getNews)
/**
 * @swagger
 * /rest/Comment@POST:
 *   post:
 *     description: Access to Comment(s)
 */
   .post(news_controller.createNews)
/**
 * @swagger
 * /rest/News@PUT:
 *   post:
 *     description: Update a provided News content
 */
   .put(news_controller.updateNews)
/**
 * @swagger
 * /rest/News@DELETE:
 *   post:
 *     description: Delete New(s) by ID
 */
   .delete(news_controller.deleteNews)

app.route('/:id')
/**
 * @swagger
 * /rest/News:id@GET:
 *   post:
 *     description: Access a News - Provided ID
 */
   .get(news_controller.getNews)

module.exports = app;
