// escape model.escape(attribute) 

var hacker = new Backbone.Model({
    name: "<script>alert('xss')</script>"
});

console.log(hacker.escape('name'));