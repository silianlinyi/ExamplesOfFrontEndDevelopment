var AppView = Backbone.View.extend({
	el: document.body
});

var app = new AppView();

console.log(app.$el);
