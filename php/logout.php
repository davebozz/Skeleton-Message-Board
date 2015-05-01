<?php
	require("../../include/utility.php");
	session_start();
		
	session_destroy();

	if(1)
	{
		$message = array("type"=>"Success_LogOut");
		$encode = json_encode($message);
		echo $encode;
		/*
			-When a user clicks LogOut, header will send
			the user back to the homepage when they
			kill the session.
		*/
	}
?>