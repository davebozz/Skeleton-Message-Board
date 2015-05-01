<?php
	require("../../include/utility.php");

	$dbconn = connectToDB();
	session_start();

	if($_SERVER["REQUEST_METHOD"]=="POST")
	{
  		//Assign variables over via ajax
  		$fname = cleanInput($_POST["First_Name"]);
  		$username = cleanInput($_POST["User_Name"]);
  		$lname = cleanInput($_POST["Last_Name"]);
  		$email = cleanInput($_POST["Email"]);
  		$password = cleanInput($_POST["Password"]);
  		
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
		$query = "SELECT * FROM Users WHERE Username='$username' OR Email='$email'";
		$result = $dbconn->query($query);
		
		if($result->num_rows >= 1)
		{
			$myrow = $result->fetch_array();
			$Used_Email = $myrow['Email'];
			$Used_Usr = $myrow['Username'];
			
			if($Used_Usr != "")
			{
				logMsg("Username already in use!");
				$message = array("type"=>"UserName_Used");
				$encode = json_encode($message);
				$logMsg($encode);
				echo $encode;
			}
			
			if($Used_Email != "")
			{
				logMsg("Email already in use!");
				$message = array("type"=>"Email_Used");
				$encode = json_encode($message);
				$logMsg($encode);
				echo $encode;	
			}
			
		}  		
  		
  		else 
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