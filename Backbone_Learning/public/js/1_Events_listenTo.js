var Person = Backbone.Model.extend({
	defaults: {
		username: '',
		password: ''
	}
});

var PersonView = Backbone.View.extend({
	render: function() {
		var h3 = document.createElement('h3');
		h3.innerHTML = 'username:' + this.model.get('username') + ',password=' + this.model.get('password');
		this.el.appendChild(h3);
		document.body.appendChild(this.el);
		return this;
	}
});

var p = new Person({
	username: 'zhangsan',
	password: '123456'
});
var pv = new PersonView({
	model: p
});

// p.on('change', pv.render, pv);
// 等价于
pv.listenTo(p, 'change', pv.render);
p.set('username', 'kyle');
p.set('password', '654321');
