var User = Backbone.Model.extend({
	defaults: {
		id: '',
		username: '',
		age: 0
	},
	idAttribute: "id"
});

var UserCollection = Backbone.Collection.extend({
	model: User,
	url: '/xml',
	parse: function(response, options) {
		var ret = [];
		var data = response.data;
		var xmlDoc = $.parseXML(data);
		var users = xmlDoc.getElementsByTagName('user');
		
		for(var i = 0; i < users.length; i++) {
			var user = users[i];
			ret.push({
				id: user.getElementsByTagName('id')[0].innerHTML,
				username: user.getElementsByTagName('username')[0].innerHTML,
				age: Number(user.getElementsByTagName('age')[0].innerHTML)
			});
		}
		return ret;
	}
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