var User = Backbone.Model.extend({
	defaults: {
		_id: "",
		username: "",
		password: ""
	},
	idAttribute: "_id",
	initialize: function() {
		console.log('initialize');

		// when a model (or collection) has started a request to the server.
		this.on('request', function(model, xhr, options) {
			console.log('===== request =====');
			console.log(arguments);
		});
		// when a model (or collection) has been successfully synced with the server.
		this.on('sync', function(model, resp, options) {
			console.log('===== sync =====');
			console.log(arguments);
		});
		// when a model is destroyed.
		this.on('destroy', function(model, collection, options) {
			console.log('===== destroy =====');
			console.log(arguments);
		});
	}
});

var UserCollection = Backbone.Collection.extend({
	model: User,
	url: "/users"
});

var users = new UserCollection();
users.fetch({
	success: function(collection, response, options) {
		var user1 = collection.at(0);
		user1.destroy({
			success: function(model, response, options) {
				console.log('===== success =====');
				console.log(arguments);
			},
			error: function(model, xhr, options) {
				console.log('===== error =====');
				console.log(arguments);
			}
		});
	},
	error: function(collection, response, options) {

	}
});