function LoginForm(form)
{
	//Check to see if UserName was entered appropriate
	if(form.Username.value==""){
		$('.EnterError').show();
	}

	//Checks to see if UserPassword was filled out
	if(form.UserPassword.value==""){
		console.log("HI");
		$('.EnterError').show();
	}


}
