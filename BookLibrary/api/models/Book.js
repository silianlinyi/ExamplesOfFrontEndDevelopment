var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BookSchema = new Schema({
	coverImage: String,
	title: String,
	author: String,
	releaseDate: String,
	keywords: {
		type: [String],
		default: []
	}
});

module.exports = mongoose.model('Book', BookSchema, 'books');