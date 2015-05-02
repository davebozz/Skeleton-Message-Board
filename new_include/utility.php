<?php
	function connectToDB() 
	{
		$dbPath="localhost"; 
		$dbUser="dbozentkaweb"; 
		$dbPass=")^!($)#"; 
		$dbName="csc2210_dbozentka_db";
		
		$dbconn = new mysqli($dbPath,$dbUser,$dbPass);

		logMsg("Connecting to $dbPath with user $dbUser"); 
		if(!$dbconn)
		{
			logMsg('Connect Error('.mysqli_connect_errno().')'.mysqli_connect_error());
			logMsgAndDie("Error Connect to $dbPath with user $dbUser");
		}

		if(!$dbconn->select_db($dbName)) 
		{
		
		logMsgAndDie("Could not select $dbName database"); 
		
		}

		return $dbconn; 
	}

	function disconnectDB($dbconn)
	{
		$dbconn->close();
		logMsg("Disconnect from database: ");
	}

	//The log file is in /home/students/dbozentka/log/PHP_errors.log. This is designated in the .htaccess file in the root 
	//directory of csc2210. I generally use the UNIX tail command to view the file log: tail -f ~/log/PHP_Errors.log

	function logMsg($message)
	{
		error_log($message);
	}

	function logMsgAndDie($message)
	{
		error_log($message);
		die('See error log for details '.mysql_error());
	}

	function cleanInput($data) 
	{
		$data = trim($data);
		$data = stripslashes($data); 
		$data = htmlspecialchars($data); 
		return $data;
	} 

	function checkDeath($dbconn, $instance_id) {
		$update_time = "UPDATE instances SET seconds=seconds+1 WHERE id='$instance_id';";
		$dbconn->query($update_time);

		$check_command = "SELECT command FROM instances WHERE id='$instance_id';";
		$command_check = $dbconn->query($check_command);
		$cmd = $command_check->fetch_array(MYSQLI_ASSOC);

		if ($cmd["command"] == "die") {
			error_log("Dying");
			$kill_meh = "UPDATE instances SET status='dead' WHERE id='$instance_id';";
			$dbconn->query($kill_meh);
			return false;
		}
		return true;
	}
?>