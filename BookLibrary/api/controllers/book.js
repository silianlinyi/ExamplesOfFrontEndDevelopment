var Book = require('../models/Book');

module.exports = {

	findAllBooks: function(req, res, next) {
		Book.find(function(err, books) {
			if (err) {
				return next(err);
			}
			return res.json(books);
		});
	},

	newBook: function(req, res, next) {
		var book = new Book({
			title: req.body.title || 'No title',
			author: req.body.author || 'Unknown',
			releaseDate: req.body.releaseDate || 'Unknown',
			coverImage: req.body.coverImage || '/img/placeholder.jpg',
			keywords: req.body.keywords || []
		});
		book.save(function(err) {
			if (err) {
				return next(err);
			}
			return res.json(book);
		});
	},

	findBookById: function(req, res, next) {
		var id = req.params.id;
		Book.findById(id, function(err, book) {
			if (err) {
				return next(err);
			}
			return res.json(book);
		});
	},

	updateBookById: function(req, res, next) {
		var id = req.params.id;
		Book.findByIdAndUpdate(id, {
			title: req.body.title || 'No title',
			author: req.body.author || 'Unknown',
			releaseDate: req.body.releaseDate || 'Unknown',
			coverImage: req.body.coverImage || '/img/placeholder.jpg',
			keywords: req.body.keywords || []
		}, function(err, book) {
			if (err) {
				return next(err);
			}
			return res.json(book);
		});
	},

	deleteBookById: function(req, res, next) {
		var id = req.params.id;
		Book.findByIdAndRemove(id, function(err, book) {
			if (err) {
				return next(err);
			}
			return res.json(book);
		});
	}

};