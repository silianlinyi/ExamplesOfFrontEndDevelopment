var AppView = Backbone.View.extend({
	el: document.body
});

var app = new AppView();

app.setElement($('#list'));