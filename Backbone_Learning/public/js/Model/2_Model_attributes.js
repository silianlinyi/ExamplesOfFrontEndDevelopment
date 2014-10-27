var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	}
});

var user = new User({
	username: '张三',
	age: 25
});

console.log(user.attributes);
console.log(_.clone(user.attributes));
console.log(user.toJSON());