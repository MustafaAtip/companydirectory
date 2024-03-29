<?php


	// example use from browser
	// http://localhost/companydirectory/libs/php/getDepartmentByID.php?id=2
	
	// remove next two lines for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("../../sql/config.php");

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];
		
		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}	

	// echo "<pre>"; print_r($_POST); exit();

	// $_REQUEST used for development / debugging. Remember to cange to $_POST for production

	//remove spaces

	$_POST['name'] = trim($_POST['name']);
	$_POST['name'] = preg_replace('# {2,}#', ' ', $_POST['name']);
	$_POST['name'] = strtolower($_POST['name']);
	$_POST['name'] = ucfirst($_POST['name']);

    $query = 'UPDATE location SET name = "' . $_POST['name'] . '" WHERE id = ' . $_POST['id'];
	
         
	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];

	header('Content-Type: application/json; charset=UTF-8');
	
	mysqli_close($conn);

	echo json_encode($output); 

?>