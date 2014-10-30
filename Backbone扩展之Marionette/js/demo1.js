var MyModel = new MyModel({
	firstName: 'Derick',
	lastName: 'Bailey',
	email: 'derickbailey@gmail.com'
});


var MyView = Backbone.View.extend({
	template: $('#my-view-template').html(),

	render: function() {
		var compiledTemplate = _.template(this.template);
		var data = this.model.toJSON();
		var html = compiledTemplate(data);
		this.$el.html(html);
	}
});