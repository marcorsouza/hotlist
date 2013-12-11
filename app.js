var express = require('express'),
	app = express(),
	load = require('express-load'),
	path = require('path'),
	mongoose = require('mongoose');
	

//global.db = mongoose.connect('mongodb://localhost/hotlist');


db = mongoose.connect('mongodb://admin:admin@ds059888.mongolab.com:59888/hotlist');

var port = process.env.PORT || 5000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.cookieParser('mtgo'));
app.use(express.session());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname+'/public'));

load('models')
	.then('controllers')
	.then('routes')
	.into(app);

app.listen(port,function(){
	console.log('running in port '+port);
})
