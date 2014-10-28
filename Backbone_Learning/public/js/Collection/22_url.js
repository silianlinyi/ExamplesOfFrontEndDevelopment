var User = Backbone.Model.extend({
	defaults: {
		_id: '',
		username: '',
		age: 0
	},
	idAttribute: "_id"
});

var UserCollection = Backbone.Collection.extend({
	model: User,
	url: '/users'
});

var userList = new UserCollection();

userList.fetch({
	success: function(collection, response, options) {
		console.log('success');
		console.log(arguments);
	},
	error: function() {
		console.log('error');
		console.log(arguments);
	}
});