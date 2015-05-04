<?php
require("../../include/utility.php");
require("../../include/password.php");
	$dbconn = connectToDB();
	session_start();

	/*
		-Turn this into a function after working.
		-Clean it up: Could be much more fluid.
	*/
	//Check to see if both the Username & Password are set

	if(isset($_POST["User_Name"]) && isset($_POST["User_Pass"]))
	{
		$User_Name = cleanInput($_POST['User_Name']);
		$User_Pass = cleanInput($_POST['User_Pass']);
		//Protect against MySQL Injection
		$User_Name = $dbconn->real_escape_string($User_Name);
		$User_Pass = $dbconn->real_escape_string($User_Pass);

		//Remove after debug
		logMsg($User_Name);

		$query = "SELECT * FROM Users WHERE Username = '$User_Name';";

		//Remove after debug
		logMsg($query);

		if(!($result = $dbconn->query($query)))
		{
			logMsg("Bad Query");
		}
		
		if($result->num_rows <= 0)
		{
			$message = array("type"=>"No_User");
			$encode = json_encode($message);
			//Remove after debug
			logMsg($encode);
			echo $encode;
		} else {

			//Get my row and compare
			$myrow = $result->fetch_array();
			$hash = $myrow['Password'];

			if(password_verify($User_Pass,$hash))
			{
				/*
					==-If Password & Username are both correct
						begin the session and send it throughout 
						each php script
					==- Grab FName/LName/ID/
				*/
				//Assign First/Last Names & Return Via JSON
				$First_Name = $myrow['First_Name'];
				$Last_Name = $myrow['Last_Name'];

				//Begin Session Variables && Set Cookies
				$_SESSION['User_Name']=$User_Name; //Initalizing the UserName
				$_SESSION['First_Name']=$First_Name;
				$_SESSION['Last_Name']=$Last_Name;

				$message = array("type"=>"Logged_In","First_Name"=>$First_Name, "Last_Name"=>$Last_Name);
				$encode = json_encode($message);
				logMsg($encode);
				echo $encode;

			} else {
				$message = array("type"=>"Bad_Pass");
				$encode = json_encode($message);
				//Remove after debug;
				logMsg($encode);
				echo $encode;
			}
		}

	}
disconnectDB($dbconn);
?>