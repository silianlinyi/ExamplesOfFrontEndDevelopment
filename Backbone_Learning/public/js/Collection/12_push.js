var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	},
	idAttribute: "_id"
});

var UserCollection = Backbone.Collection.extend({
	model: User
});

var user1 = new User({
	_id: 10000,
	username: '张三',
	age: 24
});
var user2 = new User({
	_id: 10001,
	username: "李四",
	age: 18
});
var user3 = new User({
	_id: 10002,
	username: "王五",
	age: 20
});
var user4 = new User({
	_id: 10003,
	username: "Jack",
	age: 35
});

var userList = new UserCollection();

// push collection.push(model, [options]) 
// Add a model at the end of a collection. Takes the same options as add.

userList.push(user2);
userList.push(user3);
userList.push(user1);
userList.push(user4);

console.log(userList.toJSON());



