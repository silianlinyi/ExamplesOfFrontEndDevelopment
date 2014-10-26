var object = {};
_.extend(object, Backbone.Events);

function onChange(msg) {
	alert('change:' + msg);
}

function onAlert(msg) {
	alert('alert:' + msg);
}

object.on('change', onChange);
object.on('alert', onAlert);

// 方式一
// object.trigger('change');
// object.trigger('alert');

// 方式二
// object.trigger('change alert');

// 方式三
object.trigger('change', 'this is change event');
object.trigger('alert', 'this is alert event');


