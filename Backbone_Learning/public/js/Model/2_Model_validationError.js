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

one.on("invalid", function(model, error) {
	alert(model.get("title") + " " + error);
	alert(model.validationError);
});

one.save({
	start: 15,
	end: 10
});

