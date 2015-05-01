<?php
	require("../../include/utility.php");
/*
	Fetch all data from the session of the user 
*/
	$dbconn = connectToDB();
	session_start();

	if($_SESSION['User_Name'] == "")
	{
		logMsg("No Session Currently Active");
		$message = array("type"=>"Session_Not_Active");
		$encode = json_encode($message);
		//Remove post debug
		logMsg($encode);
		echo $encode;
	}
	else
	{
		$message = array("type"=>"Session_Active","First_Name"=>$_SESSION['First_Name'],"Last_Name"=>$_SESSION['Last_Name']);
		$encode = json_encode($message);
		//Remove post debug
		logMsg($encode);
		echo $encode;

	}

	/*
		-JSON Encode user First/Last to each HTML File via JS
		-Now I can have the Name where it says Login
		--Decide b/w Name or Logout? Possible Logout?
	*/
disconnectDB($dbconn);
?>