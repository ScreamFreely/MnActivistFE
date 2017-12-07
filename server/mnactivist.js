var express = require('express');
// var passport = require('passport');
var bodyParser = require('body-parser');
var path = require('path');

var passport = require('./strategies/local.strategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');

var social = require('./routes/social.js');

var auth = require('./auth.js');

// var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;




var app = express();
var port = process.env.PORT || 3003;

// DIRECT TO TEMPLATES
app.use(express.static('./server/public'));
// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// SET UP ROUTES
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/social', social);

// Catch all bucket, must be last!
app.use('/', indexRouter);

// // USER VALIDATION
// passport.use(new GoogleStrategy({
//     consumerKey: auth.googleAuth.clientID,
//     consumerSecret: auth.googleAuth.clientSecret,
//     callbackURL: auth.googleAuth.callbackURL
//   },
//   function(token, tokenSecret, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//   }
// ));


app.listen(port, function(){
  console.log('Listening on port', port);
});
