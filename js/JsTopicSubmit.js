/*
	Name: D.J. Bozentka & Austin Canada
	Date: May 4th, 2015
	Class: CSC-2210
	Location: dbozentka/public_html/csc2210/Skeleton-Message-Board/js/JsTopicSubmit.js
	Usage: The file used is when a user enters information on the 
		   SubmitTopic.html page, it will send the data if is inputted
		   corrected, via AJAX to the Topics.php file which will store the 
		   topic in the database and the user who stored it.
*/

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
			}

			if(jsonResData.type == "Success_Send"){
				console.log("Stored in DB!");
				//Return to the homepage 
				// or should it go to comments?
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
				
				console.log(jsonResData.type);
				console.log(jsonResData);

				if(jsonResData.type == "Not_Logged_In")
				{
					var errorText = "You are not logged in, please login!";
					$('#TitleError').text(errorText);
					//Double check to see if this works
				}

				if(jsonResData.type == "Success_Send")
				{
					var First_Name = jsonResData.First_Name;
					var Last_Name = jsonResData.Last_Name;
					document.location.href="index.html"
				}
		});
	}
}