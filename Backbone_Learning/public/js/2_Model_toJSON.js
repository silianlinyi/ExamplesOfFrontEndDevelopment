var artist = new Backbone.Model({
	firstName: "立华",
	lastName: "咸"
});

artist.set({
	birthday: "December 13, 1979"
});

console.log(JSON.stringify(artist));