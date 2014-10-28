var app = app || {};

$(function() {

	var books = [{
		title: 'Javascript: The Gook Parts',
		author: 'Douglas Crockford',
		releaseDate: '2008',
		keywords: 'Javascript Programming'
	}, {
		title: 'The Little Book on CoffeeScript',
		author: 'Alex MacCaw',
		releaseDate: '2012',
		keywords: 'CoffeeScript Programming'
	}, {
		title: 'Scala for the Impatient',
		author: 'Cay S.Horstmann',
		releaseDate: '2012',
		keywords: 'Scala Programming'
	}, {
		title: 'Javascript: The Gook Parts',
		author: 'Douglas Crockford',
		releaseDate: '2008',
		keywords: 'Javascript Programming'
	}, {
		title: 'The Little Book on CoffeeScript',
		author: 'Alex MacCaw',
		releaseDate: '2012',
		keywords: 'CoffeeScript Programming'
	}, {
		title: 'Scala for the Impatient',
		author: 'Cay S.Horstmann',
		releaseDate: '2012',
		keywords: 'Scala Programming'
	}, ];

	new app.LibraryView(books);

});