var mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId;

var User = require('../models/User');

module.exports = {

	getUsers: function(req, res, next) {
		User.find({}, function(err, docs) {
			if (err) {
				return next(err);
			}
			res.json(docs);
		});
	},

	newUser: function(req, res, next) {
		var body = req.body;

		var user = new User({
			username: body.username,
			password: body.password
		});

		user.save(function(err, user) {
			if (err) {
				return next(err);
			}
			res.json(user);
		});
	},

	updateUser: function(req, res, next) {
		console.log('updateUser');
		console.log(req.body);
	}

};