<?php
include("dbconnect.php");
session_start();

if(!isset($_SESSION['user'])) {
    header("location:index.php");
}

$user = $_SESSION['user'];
$q1 = mysqli_query($conn,"select name from users where id='$user'");
$res = mysqli_fetch_array($q1,MYSQLI_ASSOC);

$user_name = $res['name'];
?>