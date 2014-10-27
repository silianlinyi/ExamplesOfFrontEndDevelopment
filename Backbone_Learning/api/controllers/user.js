var mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId;

var User = require('../models/User');

module.exports = {

	// 根据用户Id查找某个用户
	findUserById: function(req, res, next) {
		var _id = req.params._id;
		User.findById(_id, function(err, user) {
			if (err) {
				return next(err);
			}
			res.json(user);
		});
	},

	// 查找用户列表
	getUsers: function(req, res, next) {
		User.find({}, function(err, docs) {
			if (err) {
				return next(err);
			}
			res.json(docs);
		});
	},

	// 新建用户
	newUser: function(req, res, next) {
		var body = req.body;

		if (!body.username) {
			return res.json({
				r: 1,
				msg: '用户名不能为空'
			});
		}
		if (!body.password) {
			return res.json({
				r: 1,
				msg: '密码不能为空'
			});
		}

		var user = new User({
			username: body.username,
			password: body.password
		});

		user.save(function(err, user) {
			if (err) {
				return next(err);
			}
			return res.json(user);
		});
	},

	// 更新用户
	updateUser: function(req, res, next) {
		console.log('updateUser');
		console.log(req.body);
	},
	
	// 删除用户
	deleteUser: function(req, res, next) {
		var _id = req.params._id;
		User.findByIdAndRemove(_id, function(err, user) {
			if (err) {
				return next(err);
			}
			return res.json(user);
		});
	}

};