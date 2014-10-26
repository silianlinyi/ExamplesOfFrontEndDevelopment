var User = Backbone.Model.extend({
	defaults: {
		username: '',
		age: 0
	}
});

var user = new User({
	username: '张三',
	age: 25
});

// 不推荐的获取方式
// console.log(user.changed);

// 推荐的获取方式
console.log(user.changedAttributes());

user.set({
	username: "李四"
});

console.log(user.changedAttributes());