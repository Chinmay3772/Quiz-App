<?php

// error_reporting(0);
if($_SERVER["REQUEST_METHOD"] == "POST") {
    
    include 'dbconnect.php';   
    
    // $content = trim(file_get_contents("php://input"));
    // $decoded = json_decode($content,true);

    $username = mysqli_real_escape_string($conn,$_POST["unameu"]); 
    $email = mysqli_real_escape_string($conn,$_POST["emailu"]);
    $password = mysqli_real_escape_string($conn,$_POST["passwordu"]);
            
    
    $sql = "Select * from users where email='$email'";
    
    $result = mysqli_query($conn, $sql);
    
    $num = mysqli_num_rows($result); 
    
    // This sql query is use to check if
    // the username is already present 
    // or not in our Database
    if($num == 0) {
    
            $hash = password_hash($password, 
                                PASSWORD_DEFAULT);
                
            // Password Hashing is used here. 
            $sql = "INSERT INTO `users` ( `name`,`email`,`password`) VALUES ('$username','$email','$hash')";
    
            $result = mysqli_query($conn, $sql);
    
            if ($result) {
                echo "success";
            }
    }// end if 
    
   if($num>0) 
   {
      echo "email already registered";
   } 
    
}//end if   
    
?>