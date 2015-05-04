$(function(){
	$.post(
		'php/newPage.php',
		function(resData){
			jsonResData = $.parseJSON(resData);

			console.log(jsonResData);
			console.log(jsonResData.type);

			if(jsonResData.type == "Set"){
				var Title_One = jsonResData.Title_One;
				var Title_Two = jsonResData.Title_Two;
				var Title_Three = jsonResData.Title_Three;
				var Title_Four = jsonResData.Title_Four;
				var ID_One = jsonResData.One_ID;
				var ID_Two = jsonResData.Two_ID;
				var ID_Three = jsonResData.Three_ID;
				var ID_Four = jsonResData.Four_ID;

				var Paragraph_One = jsonResData.Paragraph_One;
				var Paragraph_Two = jsonResData.Paragraph_Two;
				var Paragraph_Three = jsonResData.Paragraph_Three;
				var Paragraph_Four = jsonResData.Paragraph_Four;

				Inject_To_HTML(Title_One, Title_Two, Title_Three, 
					Title_Four, Paragraph_One, Paragraph_Two, Paragraph_Three, Paragraph_Four, ID_One, ID_Two, ID_Three, ID_Four);
			}
	});
});

function Inject_To_HTML(Title_One, Title_Two, Title_Three, Title_Four, Paragraph_One, Paragraph_Two, Paragraph_Three, Paragraph_Four, ID_One, ID_Two, ID_Three, ID_Four)
{
	
	$("#Title_H_One").html("<a href='#' data-ajax='false' onClick='Data_One("+ID_One+");'>"+Title_One+"</a>");
	$("#Desc_One").html("<a href='#' data-ajax='false' onClick='Data_One("+ID_One+");'>"+Paragraph_One+"</a>");
	
	$("#Title_H_Two").html("<a href='#' data-ajax='false' onClick='Data_One("+ID_Two+");'>"+Title_Two+"</a>");
	$("#Desc_Two").html("<a href='#' data-ajax='false' onClick='Data_One("+ID_Two+");'>"+Paragraph_Two+"</a>");

	$("#Title_H_Three").html("<a href='#' data-ajax='false' onClick='Data_One("+ID_Three+");'>"+Title_Three+"</a>");
	$("#Desc_Three").html("<a href='#' data-ajax='false' onClick='Data_One("+ID_Three+");'>"+Paragraph_Three+"</a>");

	$("#Title_H_Four").html("<a href='#' data-ajax='false' onClick='Data_One("+ID_Four+");'>"+Title_Four+"</a>");
	$("#Desc_Four").html("<a href='#' data-ajax='false' onClick='Data_One("+ID_Four+");'>	"+Paragraph_Four+"</a>");
	
}
