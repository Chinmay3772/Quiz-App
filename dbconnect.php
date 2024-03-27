<?php
   
    $servername = "localhost"; 
    $username = "root"; 
    $password = "";
   
    $database = "surveyform";

    $conn = mysqli_connect($servername, 
         $username, $password, $database);
   
    if($conn) {
        file_put_contents('php://stderr',var_export("success",TRUE));
    } 
    else {
        die("Error". mysqli_connect_error()); 
    } 
?>