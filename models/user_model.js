let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    lastName:   {type: String,  required: 'Name is required'},
    firstName:  {type: String,  required: 'First Name is required'},
    email:      {type: String,  required: 'Email is required'},
    isAdmin:    {type: Boolean, default: false},
    created:    {type: Date,    default: Date.now},
    password:   {type: String,  required: 'Password is required'}
}))