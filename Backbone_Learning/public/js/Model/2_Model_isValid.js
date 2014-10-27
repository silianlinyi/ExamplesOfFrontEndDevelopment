var Chapter = Backbone.Model.extend({
	validate: function(attrs, options) {
		if (attrs.end < attrs.start) {
			return "can't end before it starts";
		}
	}
});

var one = new Chapter({
	title: "Chapter One: The Beginning"
});

one.set({
	start: 15,
	end: 10
});

if (!one.isValid()) {
	alert(one.get("title") + " " + one.validationError);
}