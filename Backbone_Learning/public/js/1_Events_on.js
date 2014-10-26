var object = {};
_.extend(object, Backbone.Events);

// 方式一
// object.on('alert', function(msg) {
// 	alert('Trigger an event:' + msg);
// });
// object.trigger('alert', 'This is my custom event');

// 方式二
// object.on('change:title', function(msg) {
// 	console.log(msg);
// });
// object.trigger('change:title', 'msg:change title');

// 方式三
// object.on('change:title change:content', function(msg) {
// 	console.log(msg);
// });
// object.trigger('change:title', 'msg:change title');
// object.trigger('change:content', 'msg:change content');

// 方式四
// object.on('myEvent1', function() {
// 	console.log(this);
// 	console.log(this === object);
// });
// object.on('myEvent2', function() {
// 	console.log(this);
// }, this);
// object.on('myEvent3', function() {
// 	console.log(this);
// }, window);
// object.trigger('myEvent1');
// object.trigger('myEvent2');
// object.trigger('myEvent3');

// 方式五
// object.on('all', function(eventName) {
// 	console.log(eventName);
// });
// object.trigger('myEvent');

// 方式六
object.on({
	'change:title': function() {
		console.log('title change');
	},
	'change:content': function() {
		console.log('content change');
	}
});
object.trigger('change:title');
object.trigger('change:content');


