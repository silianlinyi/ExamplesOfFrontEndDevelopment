var AppView = Backbone.View.extend({
	el: 'body',
	
	events: {
		
	},
	
	initialize: function() {
		console.log('initialize');
		console.log(arguments);
	}
	
});

var app = new AppView({
});
