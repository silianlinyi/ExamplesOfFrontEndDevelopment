var AppView = Backbone.View.extend({

	el: document.body,

	template: _.template($('#myTemp').html()),

	render: function() {
		this.$el.html(this.template({
			title: 'Hello world'
		}));
		return this;
	}

});

var app = new AppView();