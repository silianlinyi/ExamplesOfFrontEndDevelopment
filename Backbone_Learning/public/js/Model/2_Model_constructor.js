// constructor / initializenew Model([attributes], [options]) 

var User = Backbone.Model.extend({
	defaults: {
		username: '',
		password: ''
	},
	parse: function(data, options) {
		console.log(data);
		console.log(options);
		var xmlDoc = $.parseXML(data.xml);
		var username = xmlDoc.getElementsByTagName('username')[0].innerHTML;
		var password = xmlDoc.getElementsByTagName('password')[0].innerHTML;
		return {
			username: username,
			password: password
		};
	}
});

var xml = '<?xml version="1.0" encoding="UTF-8"?><root><username>kyle</username><password>123456</password></root>'

// If {parse: true} is passed as an option, the attributes will first be converted 
// by parse before being set on the model.
var user = new User({
	xml: xml
}, {
	parse: true,
	collection: 'users'
});
