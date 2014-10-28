//var AppView = Backbone.View.extend({
//	tagName: 'ul'
//});

//var AppView = Backbone.View.extend({
//	className: 'myClass'
//});

//var AppView = Backbone.View.extend({
//	id: 'myId'
//});

//var AppView = Backbone.View.extend({
//	attributes: {
//		'data-id': '10000',
//		'title': 'this is title.'
//	}
//});

//var AppView = Backbone.View.extend({
//	el: 'body'
//});

var AppView = Backbone.View.extend({
	el: document.body
});

var app = new AppView();

console.log(app.el);
