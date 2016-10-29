var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Machine = require('./machine');

var licenseSchema = new Schema({
    machine: { type: mongoose.Schema.Types.ObjectId, ref: "Machine" },    
    licenseType: { type: String, lowercase: true },
    validFrom: { type: Date},
    validTo: { type: Date },
    demoDuration: { type: String },
    maintenancePeriod: { type: String }, 
    maintenanceType: { type: String }, 
    additionalProps: { type: Array }   
});

module.exports = mongoose.model('License', licenseSchema);;