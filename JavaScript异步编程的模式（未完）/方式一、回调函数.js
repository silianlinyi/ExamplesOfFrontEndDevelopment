function f1() {
	console.log('f1');
	setTimeout(function() {
		console.log('f2');
		setTimeout(function() {
			console.log('f3');
			setTimeout(function() {
				console.log('f4');
			}, 3000);
		}, 2000);
	}, 1000);
}

f1();
