let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    name:       {type: String, required: 'Name is required'},
    firstName:  {type: String, required: 'First Name is required'},
    email:      {type: String, required: 'Email is required'},
    admin:      {type: Boolean},
    created:    {type: Date, default: Date.now},
    status:     {type: String, enum: ['waiting', 'enabled', 'disabled'], default: 'waiting'}
}))