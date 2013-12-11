module.exports = function(app){

	var Card = app.models.card;

	var CardController = {
		index: function(req,res){

			Card.find().exec(function(erro,cards){
				if(erro){
					res.render('card/index', { cards:{}, title: 'MTGO Card' });
				}
				else
					res.render('card/index', { cards:cards, title: 'MTGO Card' });
			});
			
		},
		show: function(req,res){
			var id = req.params.id;
			Card.findById(id,function(erro,card){
				if(erro){
					res.render('card/index', { cards:{}, title: 'Card - MTGO' });
				}else{
					params = { id:id, card:card, title: card.name};
					res.render("card/show",params);	
				}
			});
		},
		update:function(req,res){
			var id = req.params.id,
				card = req.params.card;
			
			Card.findOne({name:card.name }).exec(function(erro,_card){

				if(_card == undefined || _card == null){
					card.lastUpdated = new Date();
					Card.create(card,function(erro,card){
						console.log(erro);
						if(erro)
							res.redirect("card/");
						else
							res.redirect('/card/'+card._id);
					});
				}else{
					_card.sellPrices = card.sellPrices;
					_card.buyPrices = card.buyPrices;
					_card.lastUpdated = new Date();
					_card.save(function() {
						res.redirect('/card/'+_card._id);
					});
				}				
			});

		}
	}

	return CardController;
}