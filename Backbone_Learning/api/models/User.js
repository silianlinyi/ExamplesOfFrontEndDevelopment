var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		default: ''
	},
	password: String
});

//compile schema to model
module.exports = mongoose.model('User', UserSchema, 'users');