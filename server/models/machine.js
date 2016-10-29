var user = require('./user');
var License = require('./license');
var mongoose = require('mongoose');

var machineSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },    
    machineName: { type: String, unique: true, lowercase: true },
    // licenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "License" }],
    licenses: { type: Array },
    addedOn: { type: Date, default: Date.now },
    demoDuration: { type: String },
    maintenanceType: { type: String },
    maintenanceDuration: { type: String }     
});


// machineSchema.pre('save', function(next){
//     validate here properties of the model - if any errors, send next(err)
//     the below code, as it stands, will never save an entity to mongo, as it always calls next(err), without any validation
//     var err = new Error('Machine could not be saved!');
//     next(err);
// });

machineSchema.post('save', function (doc) {
  console.log('%s has been saved', doc._id);
});

module.exports = mongoose.model('Machine', machineSchema);