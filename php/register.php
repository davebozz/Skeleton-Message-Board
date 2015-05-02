<?php
require("../../include/utility.php");

	$dbconn = connectToDB();
	session_start();
	
	if($_POST)
	{
  		//Assign variables over via ajax
  		$fname = cleanInput($_POST["First_Name"]);
  		$username = cleanInput($_POST["User_Name"]);
  		$lname = cleanInput($_POST["Last_Name"]);
  		$email = cleanInput($_POST["Email_Address"]);
  		$password = cleanInput($_POST["Passwd"]);
  		
  		//MySql injection check
  		$fname = $dbconn->real_escape_string($fname);
  		$username = $dbconn->real_escape_string($username);
  		$lname = $dbconn->real_escape_string($lname);
  		$email = $dbconn->real_escape_string($email);
  		$password = $dbconn->real_escape_string($password);
  		
  		/*
  			-=Check to see if email or username is already used
  			=-If it is, then send JSON back and have user re-register 
  		*/
  		$Used_Usr = "";
  		$Used_Email = "";
		$query = "SELECT * FROM Users WHERE Username='$username'";
		$result = $dbconn->query($query);
		if($result->num_rows >= 1)
		{
			$myrow = $result->fetch_array();
			$Used_Usr = $myrow['Username'];
			
			logMsg("Username already in use!");
			$message = array("type"=>"UserName_Used");
			$Usr_encode = json_encode($message);
			logMsg($Usr_encode);
			
		}

		$query = "SELECT * FROM Users WHERE Email='$email'";
		$result = $dbconn->query($query);
		if($result->num_rows >= 1)
		{
			$myrow = $result->fetch_array();
			$Used_Email = $myrow['Email'];

			logMsg("Email aleady in use!");
			$message = array("type"=>"Email_Used");
			$Email_encode = json_encode($message);
			logMsg($Email_encode);
		}

		if($Used_Email != "" && $Used_Usr != ""){
			$message = array("type"=>"Both_Used");
			$encode = json_encode($message);
			logMsg($encode);
			echo $encode; 
		}
		elseif($Used_Email != "" && $Used_Usr == ""){
			echo $Email_Encode;
		}
		elseif($Used_Email == "" && $Used_Usr != ""){
			echo $Usr_encode;
		}

  		
  		if($Used_Email == "" && $Used_Usr == "")
  		{
  		
	  		$query = "INSERT INTO Users (ID, First_Name, Last_Name, Username, Email, Password) VALUES (NULL,'$fname','$lname','$username','$email','$password')";
	  		
	  		if(!($result = $dbconn->query($query)))
	  		{
	  			logMsg("Bad Query on Insert");
	  		}
	  		//Establish Sessions For Registered User
	  		//Log Usr In
	  		$_SESSION['User_Name']=$username;
	  		$_SESSION['First_Name']=$fname;
	  		$_SESSION['Last_Name']=$lname;
  		}
	}
?>