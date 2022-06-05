<?php

	$inData = getRequestInfo();
	$delete = $inData["delete"];
	$ID = $inData["ID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("DELETE from Contacts where Name=? and ID=?");
		//$delete = "%" . $inData["delete"] . "%";
		//$stmt->bind_param("ss", $inData["delete"], $inData["ID"]);
		$stmt->bind_param("ss", $delete, $ID);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		print "Deleted Contact => ID: $ID, and Name: $delete";
		// while($row = $result->fetch_assoc())
		// {
		// 	//print($row["ID"];)
		// 	if( $searchCount > 0 )
		// 	{
		// 		$searchResults .= ",";
		// 		$ID .=",";
		// 	}
		// 	$searchCount++;
		// 	//$ID++;
		// 	$ID .= '"' . $row["ID"] . '"';
		// 	$searchResults .= '"' . $row["Name"] . '"';
			
		// }
		
		// if( $searchCount == 0 )
		// {
		// 	returnWithError( "No Records Found" );
		// }
		// else
		// {
		// 	//returnWithInfo( $searchResults );
		// 	returnWithInfo( $searchResults, $ID );
		// 	//returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
		// }
		
		$stmt->close();
		$conn->close();
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults, $ID)
	{
		$retValue = '{"results":[' . $searchResults . '],"ID":['. $ID . '], "error":""}';
		//$retValue = '{"results":[' . $searchResults . '], "error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>