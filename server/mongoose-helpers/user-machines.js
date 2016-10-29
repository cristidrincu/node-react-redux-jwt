var mongoose = require('mongoose');
var Machine = require('../models/machine');
var userDetails = require('./user-details');
var Q = require('q');
mongoose.Promise = Q.Promise;

exports.addMachine = function() {
    var promise = Machine.find({'machineName': '123456'}).exec();
    promise.then(function(existingMachine){        
        if(!existingMachine) {
            var machine = new Machine({
                machineId: '12345678910',
                machineName: 'machine1'                                
            });
            console.log(machine);
            return machine.save(); //promise
        }
    }).then(function(){
        console.log('Saved machine:');
    }).catch(function(err) {
        console.log('error:' + err);
    });     
    // Machine.findOne({'machineName': '123456'}, function(err, existingMachine){
    //     if(!existingMachine) {            
    //         var machine = new Machine({
    //             machineId: "12345678910",
    //             machineName: 'some machine name'                                
    //         });            
    //         machine.save(function(err) {
    //             if(err) {
                                      
    //             }                
    //         });            
    //         console.log(machine);                                                            
    //     }        
    // });                                       
};

exports.getMachineDetails = function(machineName) {
    var deferred = Q.defer();
    Machine.find({machineName: machineName}).exec(function(err, machine) {
        if(err) deferred.reject(new Error(err.message));
        if(!machine) {
            deferred.reject(new Error('No machine found!'));            
        }

        deferred.resolve(machine);        
    });

    return deferred.promise;
};