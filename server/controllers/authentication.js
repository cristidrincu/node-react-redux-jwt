const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
    //the subject aka sub is the subject of the token we are generating
    //iat - issued at time - specific property of jwt
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    //we have access to req.user from passport's done(null, user) at line 34 in passport.js file
    res.send({ token: tokenForUser(req.user) });
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

        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err) {
            if(err) {
                return next(err);
            }

            res.json({ token: tokenForUser(user) });            
        });
    })
};