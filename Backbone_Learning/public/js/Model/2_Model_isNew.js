var User = Backbone.Model.extend({
	defaults: {
		username: "",
		age: 0
	}
});

var user = new User({
	username: "张三",
	age: 20
});

console.log(user.isNew());
