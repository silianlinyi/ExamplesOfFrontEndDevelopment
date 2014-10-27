var Book = Backbone.Model.extend({
	urlRoot: '/books'
});

var solaris = new Book({
	id: "1083-lem-solaris"
});

alert(solaris.url());