var User = Backbone.Model.extend({
	defaults: {
		_id: "",
		username: "",
		password: ""
	},
	url: '/users/5441bfb9dca398d3709ab597'
});

var user = new User();

user.on('change', function() {
	console.log('===change===');
	console.log(arguments);
});
user.on('change:_id', function() {
	console.log('===change:_id===');
	console.log(arguments);
});
user.on('change:username', function() {
	console.log('===change:username===');
	console.log(arguments);
});
user.on('change:password', function() {
	console.log('===change:password===');
	console.log(arguments);
});

function successCall(model, response, options) {
	console.log('success');
	console.log(model.toJSON());
	console.log(user.toJSON());
}

function errorCall(model, response, options) {
	console.log('error');
	console.log(arguments);
}

user.fetch({
	success: successCall,
	error: errorCall
});

//setInterval(function() {
//	user.fetch({
//		success: successCall,
//		error: errorCall
//	});
//}, 1000);