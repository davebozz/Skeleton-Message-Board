/*
	Name: D.J. Bozentka & Austin Canada
	Date: May 4th, 2015
	Class: CSC-2210
	Location: dbozentka/public_html/csc2210/Skeleton-Message-Board/js/tmp.js
	Usage: The file used when the user clicks on one of the 4 newest topics listed
		    on index.html. When a clicks on it, it calls the tmp.php php file, which
		    queries the database in relation to that topcis ID number, and then shoots the data
		    to the TopicReturn.js file, which creates the tmp.html file which is a temporary file for that
		    section. This will direct you to the tmp.html file. 
*/

function Data_One(b){
$.post(
		'php/tmp.php',
		{"Topic_ID":b},function(){
		document.location.href="tmp.html";	
		});

}
