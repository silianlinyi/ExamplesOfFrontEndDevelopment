// clear model.clear([options]) 
var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	}
});

var user = new User({
	username: 'kyle',
	age: 25
});

user.on('change', function(model) {
	console.log('===change===');
	console.log(arguments);
});

user.on('change:username', function(model, value) {
	console.log('===change:username===');
	console.log(arguments);
});

console.log(user.toJSON());

// 方式一
// user.clear();
// console.log(user.toJSON());

// 方式二
user.clear({
	silent: true
});
console.log(user.toJSON());