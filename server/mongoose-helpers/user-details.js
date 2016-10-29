var Q = require('q');
var User = require('../models/user');

exports.getUserDetails = function(userId) {
    var deferred = Q.defer();
    User.findById(userId).populate('machines').exec(function(err, user){
         if(err) deferred.reject(err.message);
                    
        deferred.resolve(user);
    });    

    return deferred.promise;
};

exports.getUserIdByEmail = function(userEmail) {
    var deferred = Q.defer();
    User.find({email: userEmail}).exec(function(err, user) {
        if(err) deferred.reject(err.message);
        deferred.resolve(user);
    });

    return deferred.promise;
};