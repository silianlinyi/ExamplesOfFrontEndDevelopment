var Person = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	}
});

var PersonView = Backbone.View.extend({
	initialize: function() {
		this.model.on('change', this.render, this);
	},
	
	render: function() {
		alert('render');
	}
});

var p = new Person({
	username: "张三",
	age: 20
});

var pv = new PersonView({
	model: p
});

pv = new PersonView({
	model: p
});

p.set('username', '李四');