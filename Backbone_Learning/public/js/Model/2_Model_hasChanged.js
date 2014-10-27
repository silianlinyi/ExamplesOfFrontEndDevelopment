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

user.on('change', function() {
	if (this.hasChanged()) {
		console.log('模型实例属性改变了');
	}
	if (this.hasChanged('username')) {
		console.log('username属性改变了');
	}
	if (this.hasChanged('age')) {
		console.log('age属性改变了');
	}
});

user.set({
	username: "李四",
	age: 18
});
