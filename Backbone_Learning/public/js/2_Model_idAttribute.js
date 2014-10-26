var Meal = Backbone.Model.extend({
    idAttribute: "_id"
});

var cake = new Meal({
    _id: 1,
    name: "Cake"
});
alert("Cake id: " + cake.id);