
function jQuery() {
	return new jQuery.prototype.init();
}

jQuery.prototype.init = function() {}
jQuery.prototype.css = function() {}

jQuery.prototype.init.prototype = jQuery.prototype;
