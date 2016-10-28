<?php  
	$bees=$_POST['bees'];
    shuffle($bees);	
	echo json_encode($bees);
?>