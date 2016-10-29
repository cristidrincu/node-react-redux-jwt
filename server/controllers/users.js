var User = require('../models/user');
var Machine = require('../models/machine');

exports.getUsers = function(req, res, next) {
    User.find({}).populate('machines').exec(function(err, users){        
        if(err) {
            res.status(404).json( {message: { error: err.message }} );
            return next(err);
        }
        res.status(200).json({ users: users, message: { success: 'Users fetched successfully!' } });                
    });
};

exports.getUserInList = function(req, res, next) {
    User.findById(req.params.userId).populate('machines').exec(function(err, user){        
        if(err) {
            res.status(404).json( {message: { error: err.message }} );
            return next(err);
        }
        res.status(200).json({ userDetailsInList: user, message: { success: 'User fetched successfully!' } });                
    });
};

exports.doesMachineBelongToUser = function(req, res, next) {
    User.findById(req.params.userId).exec(function(err, user) {
        if (err) {
            res.status(503).json({ message: { error: 'An internal error has occured:' + err.message } });
        }

        if (user) {                                                                                                            
            user.machines.indexOf(req.params.machineId) != -1  ? res.status(200).json({ machineBelongsToUser: true }) : res.status(200).json({ machineBelongsToUser: false });                                                                                                        
        }
    });
};