<?php
require("../../include/utility.php");
session_start();

	if(isset($_SESSION['Title']) && !isset($_SESSION['Paragraph'])){
		$message = array("type"=>"Only_Title", "Title"=>$_SESSION['Title']);
		$encode = json_encode($message);
		echo $encode;
	}

	if(isset($_SESSION['Title']) && isset($_SESSION['Paragraph'])){
		$message = array("type"=>"Title_Paragraph", "Title"=>$_SESSION['Title'],
						 "Paragraph"=>$_SESSION['Paragraph']);
		$encode = json_encode($message);
		logMsg($encode);
		echo $encode;

	}
?>