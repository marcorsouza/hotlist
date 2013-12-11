module.exports = function(app){

	var mtgolibrary = require('./../middleware/mtgolibrary'),
		card = app.controllers.card;

	app.get('/cards', card.index);
	app.get('/card/:id', card.show);
	app.get('/card/update/:id',mtgolibrary, card.update);
}