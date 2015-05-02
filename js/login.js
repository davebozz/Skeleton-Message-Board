var First= "";
var Last= "";

$(function(){
	$.post(
		'php/session.php',
		function(resData){
			jsonResData = $.parseJSON(resData);

			console.log(jsonResData);
			console.log(jsonResData.type);
	
			var Session_Activity = "";

			if(jsonResData.type == "Session_Active")
			{

				var First = jsonResData.First_Name;
				var Last = jsonResData.Last_Name;
			
				Session_Activity = "Active";
				console.log(First);
				console.log(Last);

				returnNames(First, Last);
			}

			if(jsonResData.type == "Session_Not_Active")
			{
				Session_Activity = "Not_Active";
				$("#Log").html("<a href='#Login' class='ui-btn ui-btn-inline' data-ajax='false' data-transition='pop'>Login</a>");
				$("#Logged").hide();
			}
	});
});	

function LoginForm(form)
{

	//Check to see if UserName was entered appropriate
	if(form.UserName.value==""){
		var errorText = "Please fill in your UserName.";
		$('#UserError').text(errorText);

	}
	else{
		var errorText ="";
		$('#UserError').text(errorText);

	}

	//Checks to see if UserPassword was filled out
	if(form.UserPassword.value==""){
		var errorText = "Please fill in your Password.";
		$('#PassError').text(errorText);

	}
	else{
		var errorText ="";
		$('#PassError').text(errorText);

	}

	var UserPassword = form.UserPassword.value;
	var UserName = form.UserName.value;
	console.log("User Password: "+UserPassword);
	console.log("User Name: "+UserName);

	//=-If The UserName & Password are filled,
	//=-Send both of them to the database
	if(form.UserPassword.value!="" && form.UserName.value !="")
	{
		$.post(
			'php/login.php',
			{"User_Name":UserName, "User_Pass":UserPassword},
			function(resData){
				jsonResData = $.parseJSON(resData);

				//Comment out post testing.
				console.log(jsonResData);
				console.log(jsonResData.type);

				if(jsonResData.type=="No_User")
				{
					var errorText = "No Username, Please Rework or Register Above.";
					$('#UserError').text(errorText);
					form.UserName.value="";
					form.UserName.focus();
					form.UserPassword.value="";
					form.UserPassword.focus();
				}

				if(jsonResData.type=="Bad_Pass")
				{
					var errorText = "Incorrect Password, try again.";
					$('#PassError').text(errorText);
					form.UserPassword.value="";
					form.UserPassword.focus();
				}

				if(jsonResData.type=="Logged_In")
				{
					var First_Name = jsonResData.First_Name;
					var Last_Name = jsonResData.Last_Name;

					//Remove Values from Password & User
					//If Logout/Login Values will be gone
					form.UserPassword.value="";
					form.UserName.value="";					
					
					//Remove after debug
					console.log(First_Name);
					console.log(Last_Name);

					//Close dialog box
					$('#Login').dialog('close');
					
					//Function to display names to the screen
					returnNames(First_Name,Last_Name);
				}
		});
	}
}

function returnNames(First, Last)
{
	//Hide the Login & Show the Logout
	$("#Log").html("<a href='#' class='ui-btn ui-btn-inline' data-ajax='false' data-transition='pop' onclick='logout();'>Log Out</a>");

	/*
		=-Display a bar in the upper right hand corner
		=-With Users First & Last Name
		=-Injection w/ color
	*/
	$("#Logged").show();
	$("#Logged").html("Logged In As <span id='LoggedIn'>"+ First + " " + Last+"</span>");
}