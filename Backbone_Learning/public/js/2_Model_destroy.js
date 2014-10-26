var User = Backbone.Model.extend({
	defaults: {
		_id: "",
		username: "",
		password: ""
	}
});

var UserCollection = Backbone.Collection.extend({
	model: User,
	url: "/users"
});

var users = new UserCollection();
users.fetch({
	success: function(collection, response, options) {
		console.log('success');
		console.log(arguments);
		var user2 = collection.at(2);
		user2.destroy();
	},
	error: function(collection, response, options) {

	}
});





//// when a model (or collection) has started a request to the server.
//user.on('request', function(model, xhr, options) {
//	console.log('request');
//	console.log(arguments);
//});
//
//// when a model (or collection) has been successfully synced with the server.
//user.on('sync', function(model, resp, options) {
//	
//});
//
//// when a model is destroyed.
//user.on('destroy', function(model, collection, options) {
//	console.log('destroy');
//	console.log(arguments);
//});
//
//user.destroy({
//	success: function(model, response, options) {
//		console.log('success');
//		console.log(arguments);
//	},
//	error: function(model, xhr, options) {
//		console.log('error');
//		console.log(arguments);
//	}
//});