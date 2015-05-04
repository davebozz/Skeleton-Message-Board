<?php
	require("../../include/utility.php");
	$dbconn = connectToDB();
	session_start();

	if(isset($_POST["Topic_ID"])){
		$Topic_ID = cleanInput($_POST['Topic_ID']);
		$Topic_ID = $dbconn->real_escape_string($Topic_ID);
	
		logMsg("Topic ID is : ".$Topic_ID);
		$query="SELECT * FROM TopicTable WHERE Topic_ID = '$Topic_ID';";
		$result = $dbconn->query($query);
		$myrow = $result->fetch_array();

		$title = $myrow['Title'];
		$paragraph = $myrow['Paragraph'];

		$_SESSION['Title'] = $myrow['Title'];
		$_SESSION['Paragraph'] = $myrow['Paragraph'];
	}
disconnectDB($dbconn);
?>