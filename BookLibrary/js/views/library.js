var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: '#books',
	
	events: {
		'click #add': 'addBook'	
	},
	
	addBook: function(e) {
		e.preventDefault();
		
		var formData = {};
				
	},

	initialize: function(initialBooks) {
		this.collection = new app.Library(initialBooks);
		this.render();
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderBook(item);
		}, this);
	},

	renderBook: function(item) {
		var bookView = new app.BookView({
			model: item
		});
		this.$el.append(bookView.render().el);
	}
});