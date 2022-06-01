
<?php

$inData = getRequestInfo();

$ID = 0;
$FirstName = "";    //wanna do just first name for now. Letter by letter if even the first letter is has matches display all the contacts starting w/ that letter
$LastName = "";
#$conn = new mysqli("localhost", "username", "password", "database");
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
if( $conn->connect_error )
{
    returnWithError( $conn->connect_error );
}
else
{
    //$stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password =?");
    $stmt = $conn->prepare("SELECT FirstName,LastName FROM Users WHERE FirstName =? AND LastName =?");
    //echo number_format($row);

    
    $stmt->bind_param("ss", $inData["FirstName"], $inData["LastName"]);
    //$stmt->bind_param("ss", $inData["FirstName"]);
    //$stmt->bind_param("s", $inData["LastName"]);
    $stmt->execute();
    $result = $stmt->get_result();

    // if( $row = $result->fetch_assoc()  )
    // {

    //     // for($x=0; $x <$row; $x++)
    //     // {
    //     //     if (str_contains($row['firstName'], $firstName))
    //     //     {
    //     //     //returnWithInfo($row['firstName'], $row['lastName'];)
    //     //     returnWithInfo( $row['firstName'], $row['lastName'], $row["id"]);
    //     //     //echo $row['firstName'];
    //     //     }
    //     // }
    //     //returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
    //     //print "User Found in DataBase!";

    // }
    // else
    // {
    //     returnWithError("No Records Found");
    // }
    print "User Found in DataBase!";
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

function returnWithInfo( $firstName, $lastName, $id )
{
    $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    sendResultInfoAsJson( $retValue );
}

?>
