ajax({
	method: 'POST',
	url: './server.js',
	data: {
		username: 'kyle',
		password: '123456'
	},
	timeout: 10000,
	// data: Object, status: String, xhr: XMLHttpRequest
	success: function(data, status, xhr) {
		console.log('success');
		console.log(arguments);
	},
	// xhr: XMLHttpRequest, errorType: String, error: Number
	error: function(xhr, errorType, error) {
		console.log('error');
		console.log(arguments);
	}
});

