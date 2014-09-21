['1.js', '2.js'].forEach(function(src) {
	var script = document.createElement('script');
	script.src = src;
	script.async = false;
	document.head.appendChild(script);
});