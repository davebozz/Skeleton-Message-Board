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

				var Paragraph_One = jsonResData.Paragraph_One;
				var Paragraph_Two = jsonResData.Paragraph_Two;
				var Paragraph_Three = jsonResData.Paragraph_Three;
				var Paragraph_Four = jsonResData.Paragraph_Four;

				Inject_To_HTML(Title_One, Title_Two, Title_Three, 
					Title_Four, Paragraph_One, Paragraph_Two, Paragraph_Three, Paragraph_Four);
			}
	});
});

function Inject_To_HTML(Title_One, Title_Two, Title_Three, Title_Four, Paragraph_One, Paragraph_Two, Paragraph_Three, Paragraph_Four)
{
	$("#Title_H_One").text(Title_One);
	$("#Desc_One").text(Paragraph_One);

	$("#Title_H_Two").text(Title_Two);
	$("#Desc_Two").text(Paragraph_Two);

	$("#Title_H_Three").text(Title_Three);
	$("#Desc_Three").text(Paragraph_Three);

	$("#Title_H_Four").text(Title_Four);
	$("#Desc_Four").text(Paragraph_Four);
}