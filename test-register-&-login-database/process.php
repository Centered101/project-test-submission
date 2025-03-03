<?php

$open_connect != 1; // ตรวจสอบว่ามีผู้ใช้ เข้ามา
require_once('connect.php'); // เชื่มต่อไปยัง connect.php

if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['confirm_Password'])) {

    $username = htmlspecialchars($username = mysqli_real_escape_string($connect, $_POST['username']));
    $email = htmlspecialchars($email = mysqli_real_escape_string($connect, $_POST['email']));
    $password = htmlspecialchars($password = mysqli_real_escape_string($connect, $_POST['password']));
    $confirm_Password = htmlspecialchars($confirm_Password = mysqli_real_escape_string($connect, $_POST['confirm_Password']));

    // ตรวจสอบการกรองข้อมูล
    if (empty($username)) {
        die(header('Location: register.php'));
        // echo ("คุณไม่ได้กรอก ชื่อผู้ใช้");
    } elseif (empty($email)) {
        die(header('Location: register.php'));
        // echo ("คุณไม่ได้กรอก อีเมล");
    } elseif (empty($password)) {
        die(header('Location: register.php'));
        // echo ("คุณไม่ได้กรอก รหัสผ่าน");
    } elseif (empty($confirm_Password)) {
        die(header('Location: register.php'));
        echo ("คุณไม่ได้กรอก ยืนยัน รหัสผ่าน");
    } elseif($password != $confirm_Password){
        die(header('Location: register.php'));
        // echo ("รหัสผ่านไม่ตรงกัน");
    } else {
        $query_check_email = "SELECT email FROM user WHERE email = '$email'";
        $call_back_query_check_email = mysqli_query($connect, $query_check_email);
    }
    if (mysqli_num_rows($call_back_query_check_email) > 0) {
        die(header('Location: register.php'));
        // echo ("อีเมลนี้มีผู้ใช้แล้ว");
    } else { // ส่มเกลือให้รหวัสผ่าน ด้วย ระไรไม่รู้ลือ
        $length = random_int(97, 128);
        $salt_account = bin2hex(random_bytes($length));
        $password = $password . $salt_accuoct;
        $algo = PASSWORD_ARGON2ID;
        $options = [
            "cost" => PASSWORD_ARGON2_DEFAULT_MEMORY_COST,
            "time" => PASSWORD_ARGON2_DEFAULT_TIME_COST,
            "threads" => PASSWORD_ARGON2_DEFAULT_THREADS
        ];
        $password = password_hash($password, $algo, $options);
        $query_create_account = "INSERT INTO users VALUES ('','$username','$email','$password','salt_account','member','default_images_account.jpg','','','','')";
        $call_back_create_account = mysqli_query($connect, $query_create_account);
        if ($call_back_create_account) {
            die(header('Location: login.php'));
        } else {
            die(header('Location: register.php'));
            // echo ("ไม่สามารถสร้างบัญชีได้");
        }
    }
} else {
    die(header('Location: register.php'));
    // echo ("กรุณากรอกข้อมูลให้ครบ");
}

?>