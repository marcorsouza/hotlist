module.exports = function(app){

	var mtgolibrary = require('./../middleware/mtgolibrary'),
		home = app.controllers.home;
	app.get('/', home.index);
}