/*
	=---JS File to submit topics
	=----Retrives Topic/Paragraph via GET from HTML 
	=--Passes it to PHP, which stores it in DB
	=---When stored it is linked to the UserID for which the user
		used to submit
*/
function SubmitForm(form){
	//Form tag must be filled out
	if(form.Title.value ==""){
		var errorText = "Please fill out the title of your submission.";
		$('#TitleError').text(errorText);
	}
	else{
		var errorText = "";
		$('#TitleError').text(errorText);
	}

	//=--If just the title is filled out: Assess 
	if(form.Title.value!=="" && form.Paragraph.value==""){
		$.post(
			'php/Topics.php',
			{"Title":form.Title.value},
			function(resData){
				jsonResData = $.parseJSON(resData);

			console.log(jsonResData);
			console.log(jsonResData.type);

			if(jsonResData.type == "Not_Logged_In"){
				var errorText = "You are not logged in, please login!";
				$('#TitleError').text(errorText);
				//Double check to see if this works
				document.location.href = 'index.html#dialog'
			}

			if(jsonResData.type == "Success_Send"){
				console.log("Stored in DB!");
				//Return to the homepage 
				// or should it go to comments?
				document.location.href = 'index.html';

			}

		});
	}

	//=--If the paragraph and the title are fileld out: Assess
	if(form.Title.value!="" && form.Paragraph.value !=""){
		$.post(
			'php/Topics.php',
			{"Paragraph":form.Paragraph.value,"Title":form.Title.value},
			function(resData){
				jsonResData = $.parseJSON(resData);

				console.log(jsonResData);
				console.log(jsonResData.value);

				if(jsonResData.type == "Not_Logged_In")
				{
					var errorText = "You are not logged in, please login!";
					$('#TitleError').text(errorText);
					//Double check to see if this works
					document.location.href = 'index.html#dialog'
				}

				if(jsonResData.type == "Success_Send")
				{
					console.log("Stored in DB!");
					//Return to the homepage 
					// or should it go to comments?
					document.location.href = 'index.html';
				}
		});
	}
}