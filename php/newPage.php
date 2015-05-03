<?php
require("../../include/utility.php");
	$dbconn = connectToDB();

	$Title_Array = array();
	$Paragraph_Array = array();

	$query = "SELECT * FROM TopicTable ORDER BY Topic_ID DESC LIMIT 4;";
	$result = $dbconn->query($query);

	while($myrow = $result->fetch_array()){
		$Title_Array[] = $myrow['Title'];
		$Paragraph_Array[] = $myrow['Paragraph'];
	}

	if(isset($Title_Array[0]) && isset($Title_Array[1]) && isset($Title_Array[2]) && isset($Title_Array[3])){
		$message = array("type"=>"Set", 
						 "Title_One"=>$Title_Array[0], "Title_Two"=>$Title_Array[1], 
						 "Title_Three"=>$Title_Array[2],"Title_Four"=>$Title_Array[3],"Paragraph_One"=>$Paragraph_Array[0],
						 "Paragraph_Two"=>$Paragraph_Array[1],"Paragraph_Three"=>$Paragraph_Array[2],
						 "Paragraph_Four"=>$Paragraph_Array[3]);
		$encode = json_encode($message);
		echo $encode;
	}
?>