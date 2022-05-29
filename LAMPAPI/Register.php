<?php
	$inData = getRequestInfo();
	
	#$color = $inData["color"];
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Login = $inData["Login"];
	$Password = $inData["Password"];

	#$conn = new mysqli("localhost", "userId", "password", "database");
	#$conn = new mysqli("localhost", "NewUser", "NewPass", "TestFirst", "TestLast", "COP4331");
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Users (Login, FirstName, LastName, Password) VALUES(?,?,?,?)");
		//$stmt->bind_param("ss", $inData["login"], $inData["password"]);
		//$stmt->bind_param("ssss", $inData["userId"], $inData["firstName"], $inData["lastName"], $inData["password"]);
		$stmt->bind_param("ssss", $Login, $FirstName, $LastName, $Password);
		$stmt->execute();
		
		// if( $row = $result->fetch_assoc()  )
		// {
		// 	echo "Username already taken<br>";
		// }
		//returnWithInfo( $row['FirstName'], $row['LastName'], , $row['Password'], $row['Login'] );
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>