<?php include 'batabase.php'; ?>

<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>เข้าสู่ระบบ</title>

    <link rel="stylesheet" href="style.css">

</head>
<body>
    <form action="process.php" method="post">
        <h1>เข้าสู่ระบบ</h1>

        <label for="username">ชื่อผู้ใช้<span>*</span></label>
        <input type="text" name="username" placeholder="ชื่อผู้ใช้" require>

        <label for="email">อีเมล<span>*</span></label>
        <input type="text" name="email" placeholder="อีเมล" require>

        <label for="password">ระหัสผ่าน<span>*</span></label>
        <input type="password" name="password" placeholder="ระหัสผ่าน" require>

        <input type="submit" value="เข้าสู่ระบบ">
        <p>ยังไม่มีบัญชีใช้มั้ย <a href="register.php" rel="noopener noreferrer">สร้างบัญชี</a></p>
    </form>
</body>
</html>