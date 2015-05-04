$(function(){
	$.post(
		'php/TopicReturn.php',
		function(resData){
			jsonResData = $.parseJSON(resData);

			console.log(jsonResData);
			console.log(jsonResData.type);

			if(jsonResData.type == "Title_Paragraph"){
				alert
				var Title = jsonResData.Title;

				var Paragraph = jsonResData.Paragraph;

				$("#Article_Title").html("<div data-ajax='false'>"+Title+"</div>");
				$("#Desc_Info").html("<div data-ajax='false'>"+Paragraph+"</div>");
			}

			if(jsonResData.type == "Only_Title"){
				var Title = jsonResData.Title;

				$("#Article_Title").html("<div data-ajax='false'>"+Title+"</div>");
				$("#Desc_Info").html("<div data-ajax='false'>"+Paragraph+"</div>");
			}
	});
});
