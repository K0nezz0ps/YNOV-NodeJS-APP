let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('News', new Schema({
    title:       {type: String, required: 'Title is required'},
    description: {type: String, required: 'Description Date is required'},
    created:     {type: Date,   default: new Date()},
    author:      {type: String, required: 'Author (user) is required to create a News.'}
}))