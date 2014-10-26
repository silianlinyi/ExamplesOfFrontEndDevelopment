// set model.set(attributes, [options]) 
var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	}
});

var user = new User();

user.on('change', function(model) {
	console.log('===change===');
	console.log(arguments);
});

user.on('change:username', function(model, value) {
	console.log('===change:username===');
	console.log(arguments);
});

user.on('change:age', function(model, value) {
	console.log('===change:age===');
	console.log(arguments);
});

// 方式一
// user.set('username', 'zhangsan');

// 方式二
// user.set({
// 	username: 'zhangsan',
// 	age: 20
// });

// 方式三
// silent为true，静默处理，不触发change事件
user.set('username', 'zhangsan', {
	silent: true
});
