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
	}
	
	if (form.username.value == "")
	{
		$("#username").html("Please enter a username");
		form.username.focus();
		good = false;
	} 
	
	if(form.lname.value == "") 
	{
		$("#lname").html("Please enter a last name");
		form.lname.focus();
		good = false;
	}
	
	if(form.email.value == "")
	{
		$("#email").html("Please enter an email");
		form.email.focus();
		good = false;
	}

	if(form.password.value == "")
	{
		$("#password").html("Please enter a password");
		form.password.focus();
		good = false;
	}

	if(form.checkPassword.value == ""){
		$("#password").html("");
		$("#checkPassword").html("Please re-enter password");
		form.password.focus();
		good = false
	} 
 
	if(!passwordCheck.test(form.password.value)){
		$("#password").html("Please enter a valid password");
		form.password.value = "";
		form.password.focus();
		good = false;
	}
 
	if(form.password.value != form.checkPassword.value){
		$("#password").html("Passwords did not match");
		form.checkPassword.value = "";
		form.password.focus();
		good = false;
	}
 
	if(!emailCheck.test(form.email.value)){
		$("#email").html("Please enter a valid email");
		form.email.value = "";
		form.email.focus();
		good = false;
	}

	var First_Name = form.fname.value;
	console.log(First_Name);
	var Last_Name = form.lname.value;
	console.log(Last_Name);
	var User_Name = form.username.value;
	console.log(User_Name);
	var Email_Address = form.email.value;
	console.log(Email_Address);
	var Passwd = form.password.value; 
	console.log(Passwd);

	if(good == true){
		$.post(
		'php/register.php',
		{"First_Name":First_Name, "Last_Name":Last_Name, "User_Name":User_Name, "Email_Address":Email_Address, "Passwd":Passwd},
		 	function(resData){
				jsonResData = $.parseJSON(resData);

		 		alert(resData);
		 		console.log(jsonResData);
		 		console.log(jsonResData.type);

		 		if(jsonResData.type=="UserName_Used")
		 		{
		 			$("#Taken_Usr").text("Username is already in use!");
		 			form.username.value= "";
		 			form.username.focus();
		 		}

		 		if(jsonResData.type=="Email_Used")
		 		{
		 			$("#Taken_Email").text("Email is already in use!");
		 			form.email.value = "";
		 			form.email.focus();
		 		}

		 		if(jsonResData.type=="Both_Used")
		 		{
		 			$("#Taken_Email").text("Email is already in use!");
		 			form.email.value = "";
		 			form.email.focus();

		 			$("#Taken_Usr").text("Username is already in use!");
		 			form.username.value= "";
		 			form.username.focus();
		 		}
		 	});
	}
}



