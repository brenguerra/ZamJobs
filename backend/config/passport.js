const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const User = require('../models/User')
var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_DEV ;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, function(jwt_payload, next) {
	User.findOne({_id: jwt_payload.id},{ password:0, createdAt:0, updatedAt:0, __v:0 } ,  function(err, user) {
		if (err) {
			return next(err, false);
		}
		if (user) {
			return next(null, user);
		} else {
			return next(null, false);
		}
	}).populate('role').populate('profile');
}));