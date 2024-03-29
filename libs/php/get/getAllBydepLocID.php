<?php

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("../../sql/config.php");

	header('Content-Type: application/json; charset=UTF-8');

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

	// $query = 'SELECT id, name, locationID FROM department ';
	// $query = 'SELECT p.id, p.name, d.name as department, d.id as departmentId, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) ORDER BY p.lastName, p.firstName, d.name, l.name';

	// $query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, d.id as departmentId, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) ORDER BY p.lastName, p.firstName, d.name, l.name';

		// $query = 'SELECT * FROM location 
		// left JOIN department  ON (department.locationID = location.id) 
		// ORDER BY department.name';

	// $query = 'SELECT DISTINCT d.name as department, d.id as departmentId, l.name as location,d.locationID as locationID FROM department d 
	// 	left JOIN location l  ON (d.locationID = l.id) 
	// 	';



	if ($_POST['departmentID'] == "getAll" AND $_POST['locationID'] != "getAll") {
		$query = 'SELECT  d.name as department, d.id as departmentId, l.name as location,d.locationID as locationID FROM department d  left JOIN location l  ON (d.locationID = l.id) WHERE d.locationID = ' . $_POST['locationID'] . ' ORDER BY d.name';
	}else if ($_POST['departmentID'] == "getAll" AND $_POST['locationID'] == "getAll") {
		$query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, d.id as departmentId, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) ORDER BY p.lastName, p.firstName, d.name, l.name';
	} else if ($_POST["p_code"] == 1 AND $_POST['locationID'] != "getAll") {
		$query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, d.id as departmentId, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) WHERE p.departmentID = ' . $_POST['departmentID'] . ' AND d.locationID = "' . $_POST['locationID'] . '"  ORDER BY p.lastName, p.firstName, d.name, l.name';
	} else if ($_POST["p_code"] == 2 OR $_POST['locationID'] == "getAll") {
		$query = 'SELECT  d.name as department, d.id as departmentId, l.name as location,d.locationID as locationID FROM department d  left JOIN location l  ON (d.locationID = l.id) WHERE d.id = ' . $_POST['departmentID'] . ' ORDER BY d.name';
	}
	







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
   
   	$data = [];



	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

	// echo "<pre>"; print_r($data); exit();

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;

	// echo "<pre>"; print_r($output['data']); exit();
	
	mysqli_close($conn);

	echo json_encode($output); 

?>