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
	app.delete('/users', user.deleteUser);


};