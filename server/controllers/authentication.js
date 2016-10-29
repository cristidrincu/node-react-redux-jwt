const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');
const mongooseHelperUserDetails = require('../mongoose-helpers/user-details');

const defaultUserType = 'reseller';

function tokenForUser(user) {
    //the subject aka sub is the subject of the token we are generating
    //iat - issued at time - specific property of jwt
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

function userRole(user) {
    return user.role;
}

function userId(user) {    
    return user._id;
}

function createUser(requestObject) {
    return new User({
        email: requestObject.body.email,
        password: requestObject.body.password,
        role: defaultUserType
    });
}

exports.signin = function(req, res, next) {
    //we have access to req.user from passport's done(null, user) at line 34 in passport.js file
    mongooseHelperUserDetails.getUserDetails(req.user._id).then(function(user) {                    
        res.status(200).json({ token: tokenForUser(req.user), role: userRole(req.user), userId: user._id, userDetails: user });
    }).catch(function(error){
        res.status(500).json({error: 'An error occured while retrieving your details. Please refresh the page and try again!'});
    });    
};

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({ error: 'You must provide an email and a password!' });
    }

    User.findOne({ 'email': email }, function(err, existingUser){
        if(err) {
            return next(err);
        }

        if(existingUser) {
            return res.status(422).send({ error: 'Email is in use' }); //422 - unprocessable entity
        }        

        const user = createUser(req);
        user.save(function(err) {
            if(err) {
                return next(err);
            }

            res.status(200).json({ token: tokenForUser(user), role: userRole(user), userDetails: user});            
        });
    });
};