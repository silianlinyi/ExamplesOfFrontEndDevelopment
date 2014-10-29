var book = require('./api/controllers/book');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index', {
			title: "Backbone Book Library"
		});
	});

	// Get a list of all books
	app.get('/api/books', book.findAllBooks);

	// Insert a new book
	app.post('/api/books', book.newBook);

	// Get a single book by id
	app.get('/api/books/:id', book.findBookById);
	
	// Update a book
	app.put('/api/books/:id', book.updateBookById);
	
	// Delete a book
	app.delete('/api/books/:id', book.deleteBookById);

};