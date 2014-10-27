// unset model.unset(attribute, [options]) 
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

console.log(user.toJSON());

// 方式一
// user.unset('age');
// console.log(user.toJSON());

// 方式二
user.unset('age', {
	silent: true
});
console.log(user.toJSON());

