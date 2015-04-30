$(function(){
	$("#Log").html("<a href='#Login' class='ui-btn ui-btn-inline' data-transition='pop'>Login</a>");
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

	//=-If The UserName & Password are filled,
	//=-Send both of them to the database
	if(form.UserPassword.value!="" && form.UserName.value !="")
	{
		$.post(
			'php/login.php',
			{"User_Name":form.UserName.value, "User_Pass":form.UserPassword.value},
			function(resData){
				jsonResData = $.parseJSON(resData);

				//Comment out post testing.
				console.log(jsonResData);
				console.log(jsonResData.type);

				if(jsonResData.type == "No_User"){
					var errorText = "No Username, Please Rework or Register Above.";
					$('#UserError').text(errorText);
					form.UserName.value="";
					form.UserName.focus();
					form.UserPassword.value="";
					form.UserPassword.focus();
				}

				if(jsonResData.type == "Bad_Pass"){
					var errorText = "Incorrect Password, try again.";
					$('#PassError').text(errorText);
					form.UserPassword.value="";
					form.UserPassword.focus();
				}

				if(jsonResData.type == "Logged_In"){
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

function returnNames(First, Last){
	//Hide the Login & Show the Logout
	$("#Log").html("<a href='#' class='ui-btn ui-btn-inline' data-transition='pop' onclick='logout();'>Log Out</a>");

	/*
		=-Display a bar in the upper right hand corner
		=-With Users First & Last Name
		=-Injection w/ color
	*/
	$("#Logged").show();
	$("#Logged").html("Logged In As <span id='LoggedIn'>"+ First + " " + Last+"</span>");
}