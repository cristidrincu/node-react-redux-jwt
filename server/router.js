var Authentication = require('./controllers/authentication');
var Users = require('./controllers/users');
var Machines = require('./controllers/machines');
var Licenses = require('./controllers/licenses');
var passportService = require('./services/passport');
var passport = require('passport');
var mongooseHelperMachines = require('./mongoose-helpers/user-machines');
var mongooseHelperUserDetails = require('./mongoose-helpers/user-details');

var User = require('./models/user');
var Machine = require('./models/machine');

//middleware for authentication on the routes we need
var requireAuth = passport.authenticate('jwt', { session: false }); //no session since we do not use cookies
var requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.status(200).send({ message: 'code is ABC123' });
    }); 

    app.get('/users', Users.getUsers); 
    //   TODO - refactor below method to use callback method found in Users.getUserDetail()
    app.get('/user-details/:userId', requireAuth, function(req, res) {
        mongooseHelperUserDetails.getUserDetails(req.params.userId).then(function(user) {                        
            res.status(200).json({userDetails: user});
        }).catch(function(error){
            res.status(500).json({error: 'An error occured while retrieving your details. Please refresh the page and try again!'});
        });                                     
    });

    app.get('/user-details-in-list/:userId', requireAuth, Users.getUserInList);
    app.get('/machine-belongs-to-user/:userId/:machineId', requireAuth, Users.doesMachineBelongToUser);

    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);

    app.get('/machines', requireAuth, Machines.getMachines);
    app.get('/machines/manage/:machineId', requireAuth, Machines.getMachineDetails);
    app.get('/machines/manage/machine-by-name/:machineName', requireAuth, Machines.getMachineDetailsUsingMachineName);
    app.delete('/machines/manage/:machineId', Machines.deleteMachine);
    app.post('/machines', requireAuth, Machines.addMachine); 
    app.post('/machines/activate-machine/:machineName/:userId', Machines.activateMachine);   
             
    app.post('/licenses', requireAuth, Licenses.addLicense);    
};