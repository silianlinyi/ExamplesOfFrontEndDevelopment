var fs = require('fs');

var user = require('./api/controllers/user');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index', {
			title: "Backbone Learning"
		});
	});

	app.get('/users/:_id', user.findUserById);
	app.get('/users', user.getUsers);
	app.post('/users', user.newUser);
	app.put('/users', user.updateUser);
	app.delete('/users/:_id', user.deleteUser);

	app.get('/xml', function(req, res) {
		fs.readFile('./data.xml', 'UTF-8', function(err, data) {
			if (err) throw err;
			console.log(data);
			res.type('text/xml');
			res.json({
				data: data
			});
		});
	});


};