var Machine = require('../models/machine');
var User = require('../models/user');
var License =require('../models/license');
var mongooseHelperUserDetails = require('../mongoose-helpers/user-details');
var mongooseHelperMachines = require('../mongoose-helpers/user-machines');

function createMachine(request) {
    return new Machine({
        user: request.body.userId,
        machineName: request.body.machineID,
        licenses: request.body.licensesCollection || [],
        demoDuration: request.body.demoDuration || '',
        maintenanceType: request.body.maintenanceType || '',
        maintenanceDuration: request.body.maintenanceDuration || ''
    });
}

exports.getMachines = function(req, res, next) {
    Machine.find({}, function(err, machines){        
        if(err) {
            res.status(404).json({ message: { error: err.message } });
            return next(err);
        }
        res.status(200).json({ machines: machines, message: { success: 'Machines collection fetched successfully!' } });                
    });
};

exports.addMachine = function(req, res, next) {
    var date = Date.now();        
    Machine.findOne({machineName: req.body.machineID}, function(err, existingMachine) {
        if(err) {
            return next(err);
        }
        if(existingMachine) {
            res.status(422).json({ message: { error: 'Machine already exists!'}});                                                         
        } else {
            var machine = createMachine(req); 
            machine.save(function(err) {
                if(err) {                    
                    return next(err);
                }
            });
            res.status(200).json({ machine: machine, message: { success: 'Machine saved succesfully'}});
        }
    });                    
};

//can it be improved?
exports.activateMachine = function(req, res, next) {
    Machine.findOne({ machineName: req.params.machineName }, function(err, existingMachine) {
        if(err) {
            res.status(404).json({ message: { error: err.message  } });
            return next(err);
        }
        if(existingMachine) {
            Machine.findOneAndUpdate(
                {_id: existingMachine._id },
                { user: req.params.userId },
                { safe: true, upsert: true },
                function(err, existingMachine ) {
                    if(err) {
                        res.status(404).json({ message: { error: err.message  } });
                        return next(err);    
                    }                    
                }
            );

            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { machines: existingMachine } },
                { safe: true, upsert: true }, function(err, user) {
                if(err) {
                    res.status(404).json({ message: { error: err.message  } });
                    return next(err);
                }                                                
                res.status(200).json({ message: { success: 'Machine activated successfully!' }});
            });
        }
    });
};

exports.getMachineDetails = function(req, res, next) {
    Machine.findById(req.params.machineId).populate('user').exec(function(err, machine){
        if(err) {
            res.status(404).json({ message: {error: 'Machine not found!'} });
            return next(err);
        } else {
            res.status(200).json({ machine: machine, message: { success: 'Machine fetched successfully!' } });
        }
    });
};

exports.getMachineDetailsUsingMachineName = function(req, res, next) {
    Machine.findOne({'machineName': req.params.machineName}, function(err, machine){
        if(err) {
            res.status(404).json({ message: { error: 'An error occurred. Error: ' + err } });
            return next(err);
        } 
        if(!machine) {
            res.status(404).json({ message: { error: 'Machine not found!' } });
            return next(err);
        }
        else {
            res.status(200).json({ machine: machine, message: { success: 'Machine fetched successfully!' } });
        }
    });
};

exports.deleteMachine = function(req, res, next) {
    Machine.remove({ _id: req.params.machineId }, function(err){
        if(!err) {
            res.status(200).json({ message: { success: 'Machine succesfully removed!'} });
        } else if(err) {
            res.status(404).json({ message: { error: err.message } });
            return next(err);
        }
    });
};