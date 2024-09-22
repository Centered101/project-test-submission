<?php

if ($open_connect != 1) {
    die(header('Location: login.php'));
}

$hostname = 'localhost';
$username = 'root';
$password = '';
$dbname = 'database';
$port = 'NULL';
$socket = 'NULL';

$connect = mysqli_connect($hostname, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ batabase
if (!$connect) {
    die("Connection failed: " . mysqli_connect_error($connect));
} else {
    mysqli_set_charset($connect, 'utf8');
    // echo('ddddddddd');
}

?>