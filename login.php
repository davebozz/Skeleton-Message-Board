<?php
	session_start();
	//Begin the session-->
	require("../include/utility.php");
	$dbconn = connectToDB();

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
		logMsg($User_Pass);

		$query = "SELECT * FROM Users WHERE Username = '$User_Name';";

		//Remove after debug
		logMsg($query);

		if((!$result = $dbconn->query($query)))
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

			if($myrow['Password'] == $User_Pass)
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

				//Begin Session Variables
				$_SESSION['User_Name']=$User_Name; //Initalizing the UserName
				$_SESSION['User_First']=$First_Name; //Initializing the First Name
				$_SESSION['User_Last']=$Last_Name; //Intializing the Last Name

				$message = array("type"=>"Logged_In","First_Name"=>$First_Name,
									"Last_Name"=>$Last_Name);
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