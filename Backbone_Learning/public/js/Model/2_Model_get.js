// get model.get(attribute) 
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

console.log(user.get('username'));
console.log(user.get('age'));