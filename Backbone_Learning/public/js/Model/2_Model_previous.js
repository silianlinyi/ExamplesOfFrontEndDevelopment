var User = Backbone.Model.extend({
	defaults: {
		username: "",
		age: 0
	}
});

var user = new User({
	username: "张三",
	age: 20
});

user.on('change:username', function(model, value, options) {
	console.log('旧用户名：' + model.previous('username'));
	console.log('新用户名：' + value);
});

user.on('change:age', function(model, value, options) {
	console.log('旧年龄：' + model.previous('age'));
	console.log('新年龄：' + value);
});

user.set({
	username: "李四",
	age: 18
});