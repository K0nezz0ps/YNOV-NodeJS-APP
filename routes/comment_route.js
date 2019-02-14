let app = require('express').Router();
let comment_controller = require('../controllers/comment_controller')

app.route('/')

/**
 * @swagger
 * /rest/Comment@GET:
 *   post:
 *     description: Access to Comment(s)
 */
   .get(comment_controller.getComment)

 /**
 * @swagger
 * /rest/Comment@POST:
 *   post:
 *     description: Create a comment for a provided news
 */
   .post(comment_controller.createComment)

/**
 * @swagger
 * /rest/Comment@PUT:
 *   post:
 *     description: Update comment value
 */
   .put(comment_controller.updateComment)

/**
 * @swagger
 * /rest/Comment@DELETE:
 *   post:
 *     description: Delete a Comment
 */
   .delete(comment_controller.deleteComment);

module.exports = app;

