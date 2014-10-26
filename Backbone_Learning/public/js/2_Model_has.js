// has model.has(attribute) 
var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	}
});

var user = new User({
	username: 'kyle'
});

console.log(user.has('username'));
console.log(user.has('age'));
console.log(user.has('pass'));
