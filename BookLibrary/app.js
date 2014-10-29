var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path');
var mongoose = require('mongoose');

// 数据库连接
mongoose.connect('mongodb://127.0.0.1/book_library', function(err) {
	if (!err) {
		console.log('【日志】连接到数据库：book_library');
	} else {
		console.log(err);
	}
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});