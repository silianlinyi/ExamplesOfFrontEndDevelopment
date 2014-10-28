var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	}
});

var UserCollection = Backbone.Collection.extend({
	model: User
});

var userList = new UserCollection();
