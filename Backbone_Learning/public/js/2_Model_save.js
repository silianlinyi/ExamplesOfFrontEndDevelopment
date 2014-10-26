var User = Backbone.Model.extend({
	defaults: {
		_id: "",
		username: "",
		password: ""
	},
	url: '/users',
	validate: function(attrs) {
		if (!attrs.username) {
			return '用户名不能为空';
		}
		if (!attrs.password) {
			return '密码不能为空';
		}
		if (attrs.password.length < 8) {
			return '密码长度为8到16位';
		}
	}
});

var user = new User();

user.on('invalid', function(model, error, options) {
	console.log('========== invalid ==========');
	console.log(model);
	console.log(error);
	console.log(options);
	console.log('========== end invalid ==========');
});

user.set({
	username: '王干',
	password: '12345678'
});

user.save(null, {
	success: function(model, response, options) {
		console.log('success');
		console.log(arguments);
	},
	error: function(model, xhr, options) {
		console.log('error');
		console.log(arguments);
	}
});