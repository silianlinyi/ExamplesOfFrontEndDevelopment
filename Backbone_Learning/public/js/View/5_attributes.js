var AppView = Backbone.View.extend({
	
	attributes: {
		'id': 'myId',
		'class': 'myClass',
		'data-title': 'this is title.',
		'data-id': '10000'
	}
	
});

var app = new AppView();

console.log(app.el);
