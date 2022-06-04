<?php
	$inData = getRequestInfo();
	$Name = $inData["Name"];
	$userId = $inData["userId"];
    $Phone = $inData["Phone"];
    $Email = $inData["Email"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts ID SET Name = ?, Phone =?, Email = ? where ID=?");
        //$stmt = $conn->prepare("UPDATE into Contacts (UserId,Name,Phone, Email) VALUES(?,?,?,?)");
		//$stmt->bind_param("ssss", $userId, $Name, $Phone, $Email);
        $stmt->bind_param("sss",$Name, $Phone, $Email);
		$stmt->execute();
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