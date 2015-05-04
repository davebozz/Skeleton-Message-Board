/*
	Name: D.J. Bozentka & Austin Canada
	Date: May 4th, 2015
	Class: CSC-2210
	Location: dbozentka/public_html/csc2210/Skeleton-Message-Board/js/TopicReturn.js
	Usage: This is the temporary file JS that injects the paragraph and its title into 
		   the general html to have a better display and if the paragraph is longer then 
		   the overflow on the frontpage, it will display the full length paragraph
		   here up to 65,590 characters(the length of TEXT in MySQL). 
		   We intend to add a comments section. Which includes a comments table in the database
		   that stores the comment and the table ID that it is linked to, and when queried, the DB
		   also returns the comments that are attached, which will create a string of comments below
		   the entered title and paragraph.
*/

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
