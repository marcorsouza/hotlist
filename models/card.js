module.exports = function(app){
	var Schema = require('mongoose').Schema;

	var price = Schema({
		botName:String,
		imgPrice:String,
		qty:Number
	})

	var card = Schema({
		mtgoLibraryId:{type:Number, required:true, index:{unique:true}},
		name:{type:String, required:true, index:{unique:true}},
		lastUpdated: Date,
		buyPrices:[price],
		sellPrices:[price]
	})
	
	return db.model('cards',card);
}