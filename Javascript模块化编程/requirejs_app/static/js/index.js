require.config({
	baseUrl: "static/",
	waitSeconds: 45,
	paths: {
		"math": "js/math",
		"jquery": "js/lib/jquery-1.11.1",
		"underscore": "js/lib/underscore",
		"backbone": "js/lib/backbone",
		"text": "js/require_plugins/text",
		"json": "js/require_plugins/json",
		"image": "js/require_plugins/image",
		"mdown": "js/require_plugins/mdown",
		"markdownConverter": "js/require_plugins/Markdown.Converter"
	}
});

require([
	'math',
	'jquery',
	'underscore',
	'backbone',
	'text!data/readme.txt',
	'json!data/foo.json',
	'json!data/bar.json!bust',
	'mdown!data/foo.md',
	'mdown!data/bar.md',
	'image!http://www.baidu.com/img/bd_logo1.png'
], function(math, $, _, Backbone, readme, foo, bar, foomd, barmd, baiduLogo) {
	console.log(math);
	console.log($);
	console.log(_);
	console.log(Backbone);
	console.log(readme);
	console.log(foo);
	console.log(bar);
	console.log(foomd);
	console.log(barmd);

	console.log(baiduLogo);

});