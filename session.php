<?php
	require("../include/utility.php");
/*
	Fetch all data from the session of the user 
*/
	$dbconn = connectToDB();
	session_start();

	$User_Name = $_SESSION['User_Name'];

	$query = "SELECT * FROM Users WHERE Username = '$User_Name';";

	if(!($result = $dbconn->query($query))){
		logMsg("Nothing returned");
	
	} else {
		$myrow = $result->fetch_array();

		//Collect all data from users
		$First_Name = $myrow['First_Name'];
		$Last_Name = $myrow['Last_Name'];
		$Email = $myrow['Email'];
		$ID_Num = $myrow['ID'];
	}

	/*
		-JSON Encode user First/Last to each HTML File via JS
		-Now I can have the Name where it says Login
		--Decide b/w Name or Logout? Possible Logout?
	*/
	
disconnectDB($dbconn);
?>