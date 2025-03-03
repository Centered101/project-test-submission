
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>สร้างบัญชี</title>

    <link rel="stylesheet" href="style.css">

</head>
<body>
    <form action="process.php" method="post">
        <h1>สร้างบัญชี</h1>

        <label for="username">ชื่อผู้ใช้<span>*</span></label>
        <input type="text" name="username" placeholder="ชื่อผู้ใช้" require>

        <label for="email">อีเมล<span>*</span></label>
        <input type="text" name="email" placeholder="อีเมล" require>

        <label for="password">ระหัสผ่าน<span>*</span></label>
        <input type="password" name="password" placeholder="ระหัสผ่าน" require>

        <label for="password">ยืนยัน ระหัสผ่าน<span>*</span></label>
        <input type="password" name="confirm_Password" placeholder="ยืนยัน ระหัสผ่าน" require>

        <input type="submit" value="สร้างบัญชี">
        <p>มีบัญชีแล้วใช้มั้ย <a href="login.php" rel="noopener noreferrer">เข้าสู่ระบบ</a></p>
    </form>
</body>
</html>