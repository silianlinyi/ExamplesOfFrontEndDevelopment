var foo = (function() {
	var value = 100
	
	return {
		getValue: function() {
			return value;
		},
		setValue: function(v) {
			value = v;
		}
	};
}());

foo.getValue(); // 100
foo.value; // undefined
foo.setValue(200);
foo.getValue(); // 200