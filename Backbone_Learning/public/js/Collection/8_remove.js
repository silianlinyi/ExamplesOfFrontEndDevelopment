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

userList.on('remove', function(model, collection, options) {
	console.log('remove');
	console.log(arguments);
});

userList.add([user1, user2, user3, user4]);

console.log('删除前');
console.log(userList.toJSON());

var ret1 = userList.remove(user2, {
	silent: true
});
var ret2 = userList.remove([user3, user4]);

console.log('删除后');
console.log(ret1);
console.log(ret2);
console.log(userList.toJSON());


