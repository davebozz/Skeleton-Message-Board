/*
	Name: D.J. Bozentka & Austin Canada
	Date: May 4th, 2015
	Class: CSC-2210
	Location: dbozentka/public_html/csc2210/Skeleton-Message-Board/js/logout.js
	Usage: The file used when the user presses the logout button, which was
		   injected into the HTML via the login.html page dependent on if a 
		   sessio is active or not. If the user presses the logout button on any
		   of the pages, it will hide the logout button, send a message via AJAX to 
		   the logout.php script which is destroy the session. If logout was 
		   successful, will return the login button and hide the users name, which appears
		   when they are logged in.
*/


function logout() {
	/*
		--Thoughts: Send back JSON Logout successful
					or unsuccessful??
		--
	*/
	$.post('php/logout.php',
		function(resData){
			jsonResData = $.parseJSON(resData);

			//Comment out post testing.
			console.log(jsonResData);
			console.log(jsonResData.type);
		
			if(jsonResData.type == "Success_LogOut"){
				
				$("#Log").html("<a href='#Login' class='ui-btn ui-btn-inline' data-transition='pop'> Login </a>");
				RemoveHeader();
			}
		});
}

function RemoveHeader(){
	$("#Logged").html("");
	$("#Logged").hide();
}