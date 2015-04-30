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
			'login.php',
			{"User_Name":UserName.value, "User_Pass":UserPassword.value},
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
					$('#UserError').text(errorText);
					form.UserPassword.value="";
					form.UserPassword.focus();
				}

				if(jsonResData.type == "Logged_In"){
					var First_Name = jsonResData.First_Name;
					var Last_Name = jsonResData.Last_Name;

					//Remove after debug
					console.log(First_Name);
					console.log(Last_Name);

					//Close dialog box
					$('#Login').dialog('close');
				}

		});

	}
}