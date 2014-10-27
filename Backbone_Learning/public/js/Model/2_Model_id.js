var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	},
	idAttribute: '_id'
});

var user = new User({
	id: 10000,
	username: 'kyle',
	age: 25,
	address: '浙江临海'
});

console.log(user.toJSON());