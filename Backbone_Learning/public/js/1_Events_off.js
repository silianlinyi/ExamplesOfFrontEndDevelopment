var object = {};
_.extend(object, Backbone.Events);

function onChange() {
	alert('change');
}

function onAlert() {
	alert('alert');
}

// 方式一
// Removes just the `onChange` callback.
// object.on('change', onChange);
// object.on('change', onAlert);
// object.trigger('change');

// object.off('change', onChange);
// object.trigger('change');

// 方式二
// Removes all "change" callbacks.
// object.on('change', onChange);
// object.on('change', onAlert);
// object.trigger('change');

// object.off('change');
// object.trigger('change');

// 方式三
// Removes the `onChange` callback for all events.
// object.on('myEvent1', onChange);
// object.on('myEvent2', onChange);
// object.trigger('myEvent1');
// object.trigger('myEvent2');

// object.off(null, onChange);
// object.trigger('myEvent1');
// object.trigger('myEvent2');

// 方式四
// Removes all callbacks for `context` for all events.
// object.on('change', onChange, window);
// object.on('alert', onAlert, window);
// object.trigger('change');
// object.trigger('alert');

// object.off(null, null, window);
// object.trigger('change');
// object.trigger('alert');

// 方式五
// Removes all callbacks on `object`.
object.on('change', onChange);
object.on('alert', onAlert);
object.trigger('change');
object.trigger('alert');

object.off();
object.trigger('change');
object.trigger('alert');




















