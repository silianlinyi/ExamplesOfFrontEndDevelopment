require.config({
	baseUrl: "static/",
	waitSeconds: 45,
	paths: {
		"jquery": "js/lib/jquery-1.11.1"
	}
});

require([
	'jquery'
], function($) {
	console.log($);
	

});