module.exports = function(req, res, next){
	var request = require("request"),
		$ = require('jQuery');

	var id= req.params.id;			
	var card = new Card();
	request("http://mtgowikiprice.com/card/view/id/"+id, function(error, response, body) {	

		var table_sell = $(body).find("#collectionSell-grid table tbody tr");
		var table_buy = $(body).find("#collectionBuy-grid table tbody tr");

		var name = $(body).find("#header").find("ul li:last").text();	
		card.mtgoLibraryId=id;	
		card.name =name;
		$(table_buy).each(function(i){
			var tds = $(this).find("td");
			var cardPrice = getCardPrice(tds);
				card.addBuyPrice(cardPrice);
		});

		$(table_sell).each(function(i){			
			var tds = $(this).find("td");
			var cardPrice = getCardPrice(tds);
				card.addSellPrice(cardPrice);
		});		

		req.params.card = card;
		return next();
	});

	var getCardPrice = function (tds) {
		
		var url_img = 'http://mtgowikiprice.com';
		var cardPrice = new CardPrice();
			cardPrice.botName =$(tds[0]).text();
			cardPrice.imgPrice=url_img+$(tds[2]).find("img").attr('src');
			cardPrice.qty=$(tds[3]).text();

		return cardPrice
	}
}

var Card = function(){
	var $this = this;
	this.mtgoLibraryId;
	this.name="";
	this.buyPrices = new Array();
	this.sellPrices = new Array();

	this.addBuyPrice = function AddBuyPrice(cardPrice){
		this.buyPrices[this.buyPrices.length] = cardPrice;
	}

	this.addSellPrice = function AddSellPrice(cardPrice){
		this.sellPrices[this.sellPrices.length] = cardPrice;
	}
}

var CardPrice = function(){
	var $this = this;
	this.botName = "";
	this.imgPrice="";
	this.qty = "";
}