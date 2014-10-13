var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

myCanvas.width = winWidth;
myCanvas.height = winHeight;

window.onresize = function() {
	alert();
}

function startHandler(e) {
	e.preventDefault();
}

function moveHandler(e) {

}

function endHandler(e) {

}

function cancelHandler(e) {

}

function enterHandler(e) {

}

function leaveHandler(e) {

}

myCanvas.addEventListener('touchstart', startHandler, false);
myCanvas.addEventListener('touchmove', moveHandler, false);
myCanvas.addEventListener('touchend', endHandler, false);
myCanvas.addEventListener('touchcancel', cancelHandler, false);
myCanvas.addEventListener('touchenter', enterHandler, false);
myCanvas.addEventListener('touchleave', leaveHandler, false);