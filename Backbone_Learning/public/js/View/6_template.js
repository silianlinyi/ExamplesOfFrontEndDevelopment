var AppView = Backbone.View.extend({

	el: document.body,

	template: _.template($('#myTemp').html()),

	initialize: function() {
		var self = this;
		this.el.innerHTML = self.template({
			title: 'Hello world'
		});
	}

});

var app = new AppView();