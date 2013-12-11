module.exports = function(app){

	var Card = app.models.card;
	
	var HomeController = {

		index : function(req,res){
			res.render('home/index', { title: 'MTGO' });
		}
	}

	return HomeController;
}