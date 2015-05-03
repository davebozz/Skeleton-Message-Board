<?php
	require("../../include/utility.php");
	session_start();
	$User_Name = $_SESSION['User_Name'];
	$dbconn = connectToDB();
	/*
		-If the user isn't logged in send back to JS
			that there currently is no session started
			and for the user to log in
	*/
	if(isset($_POST["Title"]))
	{
		//MySQL Injection Protection
		$ParagraphTitle = cleanInput($_POST['Title']);
		$ParagraphTitle = $dbconn->real_escape_string($ParagraphTitle);

		if(isset($_POST["Paragraph"]))
		{
			//If there is also a paragraph attached Protect & Assign
			$Paragraph = cleanInput($_POST['Paragraph']);
			$Paragraph = $dbconn->real_escape_string($Paragraph);
		
			if($User_Name == "")
			{
				BlankUser();
			}
			else
			{				
				//If Username is not empty, store in DB Return successful
				NotBlankUser($User_Name, $ParagraphTitle, $Paragraph);

			}
		} 
		else
		{
			if($User_Name == "")
			{
				BlankUser();
			}
			else
			{
				$Paragraph = "";
				//If Username is not empty, store in DB Return successful
				NotBlankUser($User_Name, $ParagraphTitle, $Paragraph);
			}
		}
	}

function BlankUser()
{
	//If No User encode a message back to JS via JSON
	$message = array("type"=>"Not_Logged_In");
	$encode = json_encode($message);
	//Remove Post Debug
	logMsg($encode);
	echo $encode;
}

function SendBack($First, $Last)
{
	$message = array("type"=>"Success_Send","First_Name"=>$First,"Last_Name"=>$Last);
	$encode = json_encode($message);
	logMsg($encode);
	echo $encode;
}

function NotBlankUser($UserName, $Title, $Paragraph)
{
	$dbconn = connectToDB();

	$query = "SELECT * FROM Users WHERE Username = '$UserName';";
	logMsg($query);
	
	if(!($result = $dbconn->query($query))){
		logMsg("The UserName Query didn't work! #BadSession");
	}
	
	$myrow = $result->fetch_array();
	$UserID = $myrow['ID'];
	$First_Name=$myrow['First_Name'];
	$Last_Name = $myrow['Last_Name'];

	$AddQuery = "INSERT INTO TopicTable (Topic_ID, Title, Paragraph, UserID) VALUES (NULL,'$Title','$Paragraph','$UserID');";

	SendBack($First_Name,$Last_Name);

	disconnectDB($dbconn);
}
disconnectDB($dbconn);
?>