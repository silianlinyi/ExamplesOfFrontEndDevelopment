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

userList.on('add', function(model, collection, options) {
	console.log('add');
	console.log(arguments);
});

// 方式一
userList.add(user1);
// 方式二
userList.add([user2, user3]);
// 方式三
userList.add({
	username: '赵六',
	age: 40
});
// 方式四，指定索引位置
userList.add(user4, {
	at: 1
});
// 方式五 If you're adding models to the collection that are already in the collection, 
// they'll be ignored,
userList.add(user1);

console.log(userList.toJSON());