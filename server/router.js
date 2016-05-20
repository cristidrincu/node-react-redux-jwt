/**
 * Created by cristiandrincu on 5/20/16.
 */
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//middleware for authentication on the routes we need
const requireAuth = passport.authenticate('jwt', { session: false }); //no session since we do not use cookies
const requireSigning = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.status(200).send({ hi: 'there' });
    });

    app.post('/signin', requireSigning, Authentication.signin);

    app.post('/signup', Authentication.signup);
};