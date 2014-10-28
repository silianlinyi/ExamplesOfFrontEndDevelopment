var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	}
});

var UserCollection = Backbone.Collection.extend({
	model: User
});

var user1 = new User({
	username: '张三',
	age: 24
});
var user2 = new User({
	username: "李四",
	age: 18
});
var user3 = new User({
	username: "王五",
	age: 20
});
var user4 = new User({
	username: "Jack",
	age: 35
});

var userList = new UserCollection();

userList.add([user1, user2]);

console.log(userList.toJSON());

// 方式一
userList.reset();
console.log(userList.toJSON());

// 方式二
userList.reset([user3, user4]);
console.log(userList.toJSON());



