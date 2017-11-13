var express = require('express');
const webConfig = require('../config.json')
var app = express();

//--------------------configure app----------------------
var pub = __dirname + '/public';
var view = __dirname + '/views';

app.configure(function() {
	app.set('view engine', 'html');
	app.set('views', view);
	app.engine('.html', require('ejs').__express);

	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.set('basepath', __dirname);
});

app.configure('development', function() {
	app.use(express.static(pub));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	var oneYear = 31557600000;
	app.use(express.static(pub, {
		maxAge: oneYear
	}));
	app.use(express.errorHandler());
});

app.on('error', function(err) {
	console.error('app on error:' + err.stack);
});

app.get('/', function(req, resp) {
	resp.render('index', webConfig);
});

app.get('/module/:mname', function(req, resp) {
	resp.render(req.params.mname);
});

module.exports.startServer = () => {
    console.log('正在启动管理页面前端Web服务......')
    app.listen(webConfig.webServerPort);
    console.log('前端Web服务已启动： http://0.0.0.0:7001');
}

