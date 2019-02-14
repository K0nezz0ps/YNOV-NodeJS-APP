let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('Comment', new Schema({
    content: {type: String, required: 'Description Date is required'},
    author:  {type: String, required: 'Author (user) is required to create a News.'},
    newsId:  {type: String, required: 'Related News ID is required.'},
    created: {type: Date, default: new Date()}
}))