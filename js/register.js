function checkForm(form){
	var passwordCheck = new RegExp(/^.{6,}$/);
	var emailCheck = new RegExp(/(?!.*([\_\-\.][\_\-\.]+))(?!.*(\.\.+))^([a-zA-Z][\w\-\d\.]*)@([a-zA-Z][a-zA-Z\d\-\.]*|[a-zA-Z])\.[a-zA-Z]+$/);
	var good = true; // check to see if everything is correct
	
	/*
		-Check to make sure field is filled in
	*/
	if(form.fname.value == ""){
		$("#fname").html("Please enter a name");
		form.fname.focus();
		good = false;
		return false;
	}
	
	if (form.username.value == "")
	{
		$("#username").html("Please enter a username");
		form.username.focus();
		good = false;
		return false;
	} 
	
	if(form.lname.value == "") 
	{
		$("#lname").html("Please enter a last name");
		form.lname.focus();
		good = false;
		return false;
	}
	
	if(form.email.value == "")
	{
		$("#email").html("Please enter an email");
		form.email.focus();
		good = false;
		return false;
	}

	if(form.password.value == "")
	{
		$("#password").html("Please enter a password");
		form.password.focus();
		good = false;
		return false;
	}

	if(form.checkPassword.value == ""){
		$("#password").html("");
		$("#checkPassword").html("Please re-enter password");
		form.password.focus();
		good = false
		return false;
	} 
 
	if(!passwordCheck.test(form.password.value)){
		$("#password").html("Please enter a valid password");
		form.password.value = "";
		form.password.focus();
		good = false;
		return false;
	}
 
	if(form.password.value != form.checkPassword.value){
		$("#password").html("Passwords did not match");
		form.checkPassword.value = "";
		form.password.focus();
		good = false;
		return false;
	}
 
	if(!emailCheck.test(form.email.value)){
		$("#email").html("Please enter a valid email");
		form.email.value = "";
		form.email.focus();
		good = false;
		return false;

	}

	if(good == true){
		$.post(
			'php/register.php',
		{"First_Name":form.fname.value,
		 "User_Name":form.username.value,
		 "Last_Name":form.lname.value,
		 "Email":form.email.value,
		 "Password":form.password.value},
		 	function(resData){
		 		jsonResData  = $.parseJSON(resData);

		 		console.log(jsonResData);
		 		console.log(jsonResData.type);

		 		if(jsonResData.type=="UserName_Used")
		 		{
		 			$("#username").html("Username is already in use!");
		 			form.username.value= "";
		 			form.username.focus();
		 		}

		 		if(jsonResData.type=="Registered")
		 		{

		 		}

		 		if(jsonResData.type=="Email_Used")
		 		{
		 			$("#email").html("Email is already in use!");
		 			form.email.value = "";
		 			form.email.focus();
		 		}
		 	});
	}
}