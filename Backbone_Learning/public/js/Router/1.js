var Workspace = Backbone.Router.extend({
	
	initialize: function() {
		console.log('initialize');
		this.route('page/:number', 'page', function(number) {
			console.log('page/:number');
			console.log(number);
		});
	},

	routes: {
		"help": "help",
		"search/:query": "search",
		"search/:query/p:page": "search"
	},

	help: function() {
		console.log('help');
		console.log(arguments);
	},

	search: function(query, page) {
		console.log('search');
		console.log(arguments);
	}

});

var ws = new Workspace();

ws.on('route', function() {
	console.log('route');
	console.log(arguments);
});

ws.on('route:help', function() {
	console.log('route:help');
	console.log(arguments);
});

Backbone.history.start();
