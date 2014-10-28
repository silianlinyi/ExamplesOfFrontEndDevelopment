var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	}
});

var UserCollection = Backbone.Collection.extend({
	model: User,
	initialize: function(models, options) {
		console.log('UserCollection initialize');
		console.log(arguments);
	}
});

var user1 = new User({
	username: "张三",
	age: 28
});
var user2 = new User({
	username: "李四",
	age: 20
});
var user3 = new User({
	username: "王五",
	age: 25
});

var userList = new UserCollection([user1, user2, user3]);

//userList.forEach(function(model, index, models) {
//	console.log('======= start =======');
//	console.log(model);
//	console.log(index);
//	console.log(models);
//	console.log('======= end =======');
//});

//userList.map(function(model, index, models) {
//	console.log(arguments);
//});

var ret = userList.filter(function(model, index, models) {
	return model.get('age') === 20;
});
console.log(ret);
