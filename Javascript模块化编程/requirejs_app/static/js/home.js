require.config({
	baseUrl: "static/",
	waitSeconds: 45,
	paths: {
		"math": "js/math"
	}
});

require([
	'math'
], function(math) {
	console.log(math);
	

});