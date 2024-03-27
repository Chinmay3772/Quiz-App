<?php

// error_reporting(0);
if($_SERVER["REQUEST_METHOD"] == "POST") {
    
    include 'dbconnect.php';
    session_start();   

    $email = mysqli_real_escape_string($conn,$_POST["emaili"]); 
    $password = mysqli_real_escape_string($conn,$_POST["passwordi"]);
            
    $hash = password_hash($password,PASSWORD_DEFAULT);
    
    $sql = "Select * from users where email='$email'";
    $res = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($res,MYSQLI_ASSOC);
    $count = mysqli_num_rows($res);
    if($count==1) {        
        $_SESSION['user']=$row['id'];
        $response = ['status'=>'success','message'=> "Login successful"];    
    }
    else {
        $response = ['status'=>'error','message'=> "Invalid username or password"];
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>