<?php
	$exist = True;

	$inData = getRequestInfo();
//	#$color = $inData["color"];
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Login = $inData["Login"];
	$Password = $inData["Password"];
	$CheckUser = "SELECT * from Users WHERE Login = '$Login'";


//	#$conn = new mysqli("localhost", "userId", "password", "database");
//	#$conn = new mysqli("localhost", "NewUser", "NewPass", "TestFirst", "TestLast", "COP4331");
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$CheckQuery = mysqli_query($conn,$CheckUser);
		if(mysqli_num_rows($CheckQuery)>0){
			returnWithError( "Username taken");
		}else{

		$stmt = $conn->prepare("INSERT into Users (Login, FirstName, LastName, Password) VALUES(?,?,?,?)");
		//$stmt->bind_param("ss", $inData["login"], $inData["password"]);
		//$stmt->bind_param("ssss", $inData["userId"], $inData["firstName"], $inData["lastName"], $inData["password"]);
		$stmt->bind_param("ssss", $Login, $FirstName, $LastName, $Password);
		$stmt->execute();
		$stmt2 = $conn->prepare("SELECT ID FROM Users WHERE Login='$Login'");
		$stmt2->execute();
		$result = $stmt2->get_result();
		if( $row = $result->fetch_assoc())
		{
//			echo $Login;
//			echo $row['ID'];
			returnWithInfo( $row['ID']);
		}
		else
		{
			returnWithError("Unexpected error");
		}
		// if( $row = $result->fetch_assoc()  )
		// {
		// 	echo "Username already taken<br>";
		// }
		//returnWithInfo( $row['FirstName'], $row['LastName'], , $row['Password'], $row['Login'] );
		$stmt->close();
		$stmt2->close();
		$conn->close();
//		print "Account Registered!";
//		returnWithError("");
   }
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

	function returnWithInfo($result)
	{
		$retValue = '{"ID":' . $result . '}';
		sendResultInfoAsJson($retValue);
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
