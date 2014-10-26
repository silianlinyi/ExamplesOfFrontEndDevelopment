var user = require('./api/controllers/user');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index', {
			title: "Backbone Learning"
		});
	});

	// GET
	app.get('/users', user.getUsers);

	// POST
	app.post('/users', user.newUser);

	// PUT
	app.put('/users', user.updateUser);

	// DELETE
	app.delete('/users', function(req, res) {

	});


};