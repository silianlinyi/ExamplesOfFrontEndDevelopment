// 方式一
// var Meal = Backbone.Model.extend({
//     defaults: {
//         "appetizer": "caesar salad",
//         "entree": "ravioli",
//         "dessert": "cheesecake"
//     }
// });

// alert("Dessert will be " + (new Meal).get('dessert'));

// 方式二
var Meal = Backbone.Model.extend({
    defaults: function() {
        return {
            "appetizer": "caesar salad",
            "entree": "ravioli",
            "dessert": "cheesecake"
        };
    }
});

alert("Dessert will be " + (new Meal).get('dessert'));