({
	appDir: './',
	baseUrl: './static',
	dir: 'D:/Program Files/nginx/html/requirejs_app',
	modules: [{
		name: 'js/index'
	}, {
		name: 'js/home'
	}, {
		name: 'js/about'
	}],
	fileExclusionRegExp: /^(r|build)\.js$/,
	optimizeCss: 'standard',
	removeCombined: true,
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
	},
	shim: {

	}
})