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

userList.add([user1, user2, user3, user4]);

// slice collection.slice(begin, end) 
// Return a shallow copy of this collection's models, using the same options as native Array#slice.
var ret = userList.slice(1, 3);
console.log(ret);
