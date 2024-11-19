const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// ตั้งค่าการเชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "friends_db"
});

// เชื่อมต่อฐานข้อมูล
db.connect(err => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to the database");
});

// ใช้ Body Parser เพื่อจัดการ JSON
app.use(bodyParser.json());

// ดึงข้อมูลเพื่อนทั้งหมด
app.get("/friends", (req, res) => {
    const query = "SELECT * FROM friends";
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// เพิ่มเพื่อนใหม่
app.post("/friends", (req, res) => {
    const { name, birthday } = req.body;
    const query = "INSERT INTO friends (name, birthday) VALUES (?, ?)";
    db.query(query, [name, birthday], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send("Friend added successfully");
    });
});

// ลบเพื่อน
app.delete("/friends/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM friends WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send("Friend deleted successfully");
    });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
