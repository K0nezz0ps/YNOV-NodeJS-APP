let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('Event', new Schema({
    name:       {type: String, required: 'Name is required'},
    startDate:  {type: Date, required: 'Start Date is required'},
    endDate:    {type: Date, required: 'End Date is required'},
    street:     {type: String, required: 'Street is required'},
    zipCode:    {type: Number, required: 'ZipCode is required'},
    city:       {type: String, required: 'City is required'},
    isActive:   {type: Boolean}
}))