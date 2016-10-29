var License = require('../models/license');
var mongooseHelperUserDetails = require('../mongoose-helpers/user-details');
var mongooseHelperMachines = require('../mongoose-helpers/user-machines');

exports.getLicenses = function(req, res, next) {
    License.find({}, function(err, licenses){        
        if(err) {
            return next(err);
        }
        res.status(200).json({ licenses: licenses, message: { success: 'Licenses collection fetched successfully!' } });                
    });
};

exports.addLicense = function(req, res, next) {        
    License.findOne({licenseType: req.body.licenseType}, function(err, existingLicense) {
        if(err) {
            return next(err);
        }
        if(existingLicense) {
            res.status(422).json({ message: { error: 'License already exists!'}});                                                         
        } else {
            var license = new License({
                licenseType: req.body.licenseType,                                                                
            });

            console.log(license);

            license.save(function(err) {
                if(err) {                    
                    return next(err);
                }
            });
            res.status(200).json({ license: license, message: { success: 'License saved succesfully'}});
        }
    });                    
};