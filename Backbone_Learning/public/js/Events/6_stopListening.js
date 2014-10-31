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
	password: '111'
});
var pv = new PersonView({
	model: p
});

pv.listenTo(p, 'change', pv.render);
p.set('username', 'lisi');
p.set('password', '222');

// pv.stopListening();
// p.set('username', 'wangwu');
// p.set('password', '333');

pv.stopListening(p);
p.set('username', 'wangwu');
p.set('password', '333');

