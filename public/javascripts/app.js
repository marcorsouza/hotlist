$(".btn-show-card").click(function(){
	var id = $(this).attr('rel');
	location.href = '/card/'+id;	
})

$(".btn-update-card").click(function(){
	var id = $(this).attr('rel');
	location.href = '/card/update/'+id;	
})