var User = Backbone.Model.extend({
	defaults: {
		username: '',
		password: ''
	},
	idAttribute: "_id"
});

var UserCollection = Backbone.Collection.extend({
	model: User,
	url: '/users'
});

var userList = new UserCollection();

userList.fetch({
	data: {
		size: 15,
		page: 3	
	},
	success: function(collection, response, options) {
		console.log('success');
		console.log(arguments);
	},
	error: function(collection, response, options) {
		console.log('error');
		console.log(arguments);
	}
});

var user = new User({
	username: '王干',
	password: '123456'
});

userList.create(user, {
	success: function(collection, response, options) {
		console.log('success');
		console.log(arguments);
	},
	error: function(collection, response, options) {
		console.log('error');
		console.log(arguments);
	}
});
