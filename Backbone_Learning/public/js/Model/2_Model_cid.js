var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	}
});

var user1 = new User({
	username: '张三',
	age: 25
});
var user2 = new User({
	username: '李四',
	age: 20
});
var user3 = new User({
	username: '王五',
	age: 18
});

console.log(user1.cid);
console.log(user2.cid);
console.log(user3.cid);