function logout() {
	/*
		--Thoughts: Send back JSON Logout successful
					or unsuccessful??
		--
	*/
	$.post('php/logout.php',{},
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